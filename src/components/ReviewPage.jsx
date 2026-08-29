


import { useLottie } from "lottie-react";
import { RotateCw, UserRoundPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import goog2 from "../assets-pro/73078169fac4957111df81ad1f5e3f88.png";
import anu from "../assets-pro/loading.json";
import { businesses, reviews } from "../data/data";
import Landing from "./Landing";
import {
  Button,
  ButtonGroup,
  Container,
  EditControls,
  EditTextarea,
  Loader,
  ReviewBox,
  SentimentButton,
  SentimentButtonGroup,
  Title
} from "./ReviewPageStyles";

const ReviewPage = () => {
  const { category, businessId } = useParams();
  const business = businesses[category]?.[businessId];

  // Fallback static reviews
  const businessReviews = reviews[category]?.[businessId] || [
    "Thanks for visiting, please leave feedback!",
  ];

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState("");
  const [reviewSentiment, setReviewSentiment] = useState("positive");
  const [showPopup, setShowPopup] = useState(false);
  const textareaRef = useRef(null);

  const options = {
    animationData: anu,
    loop: true,
  };

  const { View } = useLottie(options);

  // Generate review when sentiment changes
  useEffect(() => {
    if (business) {
      generateAIReview();
    }
  }, [reviewSentiment, business]);

  useEffect(() => {
    setEditedReview(review);
  }, [review]);

  const getPromptByCategory = (
    category,
    businessName,
    description,
    sentiment
  ) => {
    const basePrompt = `Write a natural, SEO-friendly customer review for ${businessName} in exactly 20-30 words. IMPORTANT: End with a complete sentence using proper punctuation (. ! or ?). Avoid incomplete thoughts, trailing commas, or words like "and", "but", "or" at the end. Use concise, complete sentences only. Return ONLY the review text (no quotes, no labels, no prefixes).
   Do not write the business name in the review.
   Business description: ${description}.`;

    let sentimentPrompt;
    switch (sentiment) {
      case "positive":
        sentimentPrompt =
          "Write a 5-star positive review using keywords like best, top-rated, amazing, trusted. Use enthusiastic tone.";
        break;
      case "mixed":
        sentimentPrompt =
          "Write a 3-4 star mixed review with balanced feedback, e.g., good but, room for improvement. Use neutral tone.";
        break;
      case "negative":
        sentimentPrompt =
          "Write a 1-2 star negative review with critical feedback, e.g., disappointing, needs improvement. Use critical tone.";
        break;
      default:
        sentimentPrompt =
          "Write a 5-star positive review using keywords like best, top-rated, amazing, trusted. Use enthusiastic tone.";
    }

    switch (category) {
      case "garage":
        return `${basePrompt}${sentimentPrompt} Highlight: Expert auto repair, fast service, reliable mechanics, affordable pricing.`;
      case "restaurant":
        return `${basePrompt}${sentimentPrompt} Highlight: Delicious cuisine, great ambiance, friendly service, memorable dining.`;
      case "hotel":
        return `${basePrompt}${sentimentPrompt} Highlight: Luxury stay, clean rooms, outstanding hospitality, modern amenities.`;
      case "general":
        return `${basePrompt}${sentimentPrompt} Highlight: Versatile products, excellent customer service, convenient shopping.`;
      case "grocery":
        return `${basePrompt}${sentimentPrompt} Highlight: Fresh produce, wide variety, high-quality goods, great shopping experience.`;
      case "serviceCenter":
        return `${basePrompt}${sentimentPrompt} Highlight: Fast repairs, quality parts, professional service, reliable technicians.`;
      case "messAndKitchen":
        return `${basePrompt}${sentimentPrompt} Highlight: Saoji food, Authentic Home-made meal, Veg & Non-Veg options, daily tiffin service, customized party orders, on-demand meals.`;

      default:
        return `${basePrompt}${sentimentPrompt} Highlight: Exceptional service, trusted quality, amazing experience.`;
    }
  };

  // Helper function to trim text to character limit while preserving complete sentences
  const trimToCharacterLimit = (text, maxChars) => {
    if (text.length <= maxChars) return text;

    let trimmed = text.substring(0, maxChars);
    const sentenceEnders = ['.', '!', '?'];

    // Find the last complete sentence within character limit
    let lastSentenceEnd = -1;
    for (let i = trimmed.length - 1; i >= 0; i--) {
      if (sentenceEnders.includes(trimmed[i])) {
        lastSentenceEnd = i;
        break;
      }
    }

    if (lastSentenceEnd !== -1 && lastSentenceEnd > maxChars * 0.7) {
      // Use complete sentence if it's not too short (at least 70% of max chars)
      return trimmed.substring(0, lastSentenceEnd + 1);
    } else {
      // Find last complete word and add period
      trimmed = trimmed.replace(/\s+\S*$/, '').trim();
      if (trimmed && !sentenceEnders.includes(trimmed[trimmed.length - 1])) {
        trimmed += '.';
      }
      return trimmed;
    }
  };

  const generateAIReview = async (retryCount = 1, maxRetries = 3) => {
    if (!business) return;
    setLoading(true);

    try {
      const prompt = getPromptByCategory(
        category,
        business.name,
        business.description || "A great local service.",
        reviewSentiment
      );

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
            "X-Title": "Review Generator",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct",
            messages: [
              {
                role: "user",
                content: prompt,
              },
            ],
            max_tokens: 80,
            temperature: 0.6,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.error?.message || "API request failed";
        console.error("OpenRouter API Error:", errorMsg, response.status);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("Raw API Response:", JSON.stringify(data, null, 2));
      let generated =
        data.choices?.[0]?.message?.content?.trim() ||
        "Couldn't generate a review.";
      console.log("Generated Review (Before Cleanup):", generated);

      // Enhanced cleanup
      generated = generated.replace(prompt, "").trim();
      generated = generated.replace(/^(Review:|###|\*\*|--|\s*)/i, "").trim();
      generated = generated.replace(/^[`'"]|['"`]$/g, "").trim();
      generated = generated.replace(/\s+/g, " ").trim();
      console.log("Generated Review (After Cleanup):", generated);

      // Trim to 20-30 words while ensuring a complete sentence
      const words = generated.split(" ");
      if (words.length > 30) {
        let trimmed = words.slice(0, 30).join(" ");

        // Find the last complete sentence within the word limit
        const sentenceEnders = ['.', '!', '?'];
        let lastSentenceEnd = -1;

        for (let i = trimmed.length - 1; i >= 0; i--) {
          if (sentenceEnders.includes(trimmed[i])) {
            lastSentenceEnd = i;
            break;
          }
        }

        if (lastSentenceEnd !== -1) {
          // Use the complete sentence
          trimmed = trimmed.substring(0, lastSentenceEnd + 1);
        } else {
          // If no complete sentence found, try to end at a natural break
          // Look for the last complete word and add a period
          trimmed = trimmed.replace(/\s+\S*$/, '').trim();
          if (trimmed && !sentenceEnders.includes(trimmed[trimmed.length - 1])) {
            trimmed += '.';
          }
        }
        generated = trimmed;
      } else if (
        words.length < 20 &&
        generated !== "Couldn't generate a valid review."
      ) {
        console.warn("Generated review too short:", generated);

        // If review is too short, regenerate instead of failing
        if (retryCount < maxRetries) {
          console.log("Review too short, retrying generation...");
          setTimeout(() => generateAIReview(retryCount + 1, maxRetries), 1000);
          return;
        } else {
          generated = "Couldn't generate a valid review.";
        }
      }

      // Validate the generated review
      const isValidReview = (text) => {
        const words = text.split(" ").filter(word => word.length > 0);
        const hasProperEnding = /[.!?]$/.test(text.trim());
        const hasNoIncompleteEnding = !text.match(/,\s*$|and\s*$|but\s*$|or\s*$/i);
        const hasMinLength = text.trim().length >= 50; // Minimum character length
        const hasNoEllipsis = !text.includes("...");

        return (
          words.length >= 20 &&
          words.length <= 30 &&
          hasProperEnding &&
          hasNoIncompleteEnding &&
          hasMinLength &&
          hasNoEllipsis
        );
      };

      if (!isValidReview(generated)) {
        console.warn("Generated review invalid:", generated);
        generated = "Couldn't generate a valid review.";
      }

      setReview(generated);
      setIsEditing(false);
    } catch (err) {
      console.error("AI Generation Error:", err.message);
      if (retryCount < maxRetries) {
        console.log(`Retrying... Attempt ${retryCount + 1}/${maxRetries}`);
        setTimeout(() => generateAIReview(retryCount + 1, maxRetries), 2000);
      } else {
        console.warn("Max retries reached, using fallback review.");
        const fallbackReview =
          businessReviews[Math.floor(Math.random() * businessReviews.length)];
        setReview(fallbackReview);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePostReview = () => {
    if (!business) return;
    navigator.clipboard.writeText(review);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      window.open(business.googleReviewUrl, "_blank");
    }, 5000);
  };

  const handleChangeReview = () => {
    generateAIReview();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedReview(review);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleSaveEdit = () => {
    setReview(editedReview.trim());
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedReview(review);
  };

  const handleReset = () => {
    generateAIReview();
  };

  const handleTextareaChange = (e) => {
    console.log("Textarea changed:", e.target.value);
    setEditedReview(e.target.value);
  };

  const handleSentimentChange = (sentiment) => {
    setReviewSentiment(sentiment);
  };

  return (
    <Container>
      {business ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "12px",
              alignItems: "flex-start",
              border: "0px solid blue",
              padding: "0px",
            }}
          >
            <div>
              <Title className="tit">{business.name}</Title>
              <div className="google_image">
                <img
                  src={goog2}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </div>
          {business.reviewType !== "hide" && (
            <SentimentButtonGroup>
              <SentimentButton
                sentiment="positive"
                isSelected={reviewSentiment === "positive"}
                onClick={() => handleSentimentChange("positive")}
              >
                Positive
              </SentimentButton>
              {["showAll", "showBoth"].includes(business.reviewType) && (
                <SentimentButton
                  sentiment="mixed"
                  isSelected={reviewSentiment === "mixed"}
                  onClick={() => handleSentimentChange("mixed")}
                >
                  Mixed
                </SentimentButton>
              )}
              {business.reviewType === "showAll" && (
                <SentimentButton
                  sentiment="negative"
                  isSelected={reviewSentiment === "negative"}
                  onClick={() => handleSentimentChange("negative")}
                >
                  Negative
                </SentimentButton>
              )}
            </SentimentButtonGroup>
          )}
          <ReviewBox loading={loading}>
            {showPopup ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                  }}
                >
                  <div>
                    <span
                      style={{
                        color: "cyan",
                        fontSize: "1.3rem",
                        fontWeight: "500",
                      }}
                    >
                      Review copied successfully! <br />
                    </span>
                    Please paste it on the Google review page.
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Loader />
                  </div>
                </div>
              </>
            ) : loading ? (
              <Loader />
            ) : isEditing ? (
              <div className="edittext" style={{ width: "100%" }}>
                <EditTextarea
                  ref={textareaRef}
                  value={editedReview}
                  onChange={handleTextareaChange}
                  rows={4}
                  placeholder="Edit your review here..."
                />
                <EditControls>
                  <Button className="save" onClick={handleSaveEdit}>
                    Save
                  </Button>
                  <Button className="cancel" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </EditControls>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <span
                  className="spann"
                  style={{
                    flex: 1,
                    textAlign: "center",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {review}
                </span>
                <div className="btns" style={{ display: "flex", gap: "10px" }}>
                  <UserRoundPen
                    onClick={handleEdit}
                    className="icon edit"
                    color="cyan"
                  />
                  <RotateCw
                    onClick={handleReset}
                    className="icon refresh"
                    color="#ed2982ff"
                  />
                </div>
              </div>
            )}
          </ReviewBox>
          <ButtonGroup>
            <Button onClick={handleChangeReview}>Change Review</Button>
            <Button className="post" onClick={handlePostReview}>
              Post Review
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <Landing />
      )}
    </Container>
  );
};

export default ReviewPage;