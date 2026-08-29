import React from "react";
import { Button, ButtonGroup, Container, InfoBox, Loader, ReviewBox, Title } from "./ReviewPageStyles";

const Landing = () => {
  return (
    <Container>
      <Title>AI Powered Review Generator</Title>
      
      <ReviewBox style={{fontSize: '18px', fontWeight: '500', background: 'linear-gradient(135deg, #161b22 0%, #1a2029 100%)'}}>
        🚀 Transform Your Review Process with AI Magic!
        <br />
        <br />
        Scan → Generate → Post → Grow!

         <br />
       
      </ReviewBox>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', margin: '30px 0'}}>
        <InfoBox style={{flex: '1', minWidth: '250px', maxWidth: '300px'}}>
          <h3>✨ How It Works</h3>
          <ul>
            <li><strong>Scan QR Code</strong> - Point your camera at any business QR code</li>
            <li><strong>AI Generates Review</strong> - Get perfectly crafted, human-like reviews</li>
            <li><strong>Customize & Copy</strong> - Tweak the review to match your experience</li>
            <li><strong>Post Instantly</strong> - Auto-redirect to business review page</li>
          </ul>
        </InfoBox>

        <InfoBox style={{flex: '1', minWidth: '250px', maxWidth: '300px'}}>
          <h3>🎯 Perfect For</h3>
          <ul>
            <li>🏢 Garages & Auto Shops</li>
            <li>🍽️ Restaurants & Cafés</li>
            <li>🏨 Hotels & Hospitality</li>
            <li>🛍️ Retail Stores</li>
            <li>💼 Service Businesses</li>
          </ul>
        </InfoBox>
      </div>

      <InfoBox style={{textAlign: 'center', maxWidth: '600px'}}>
        <h3>💡 Why Use Our AI Review Generator?</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginTop: '15px'}}>
          <div style={{padding: '10px'}}>
            <strong>🤖 AI-Powered</strong>
            <p style={{fontSize: '13px', margin: '5px 0 0 0', color: '#8b949e'}}>Generates authentic, human-like reviews instantly</p>
          </div>
          <div style={{padding: '10px'}}>
            <strong>⚡ Save Time</strong>
            <p style={{fontSize: '13px', margin: '5px 0 0 0', color: '#8b949e'}}>No more struggling to write perfect reviews</p>
          </div>
          <div style={{padding: '10px'}}>
            <strong>📈 Boost SEO</strong>
            <p style={{fontSize: '13px', margin: '5px 0 0 0', color: '#8b949e'}}>SEO-optimized reviews that help businesses rank higher</p>
          </div>
          <div style={{padding: '10px'}}>
            <strong>🔒 Trust Building</strong>
            <p style={{fontSize: '13px', margin: '5px 0 0 0', color: '#8b949e'}}>Build credibility with genuine-looking feedback</p>
          </div>
        </div>
      </InfoBox>

      <ReviewBox style={{background: 'transparent', border: '2px dashed #30363d', fontStyle: 'italic' , margin:"12px 0px"}}>
        "The AI generated a perfect review for my garage visit - saved me 10 minutes and sounded more professional than I ever could!"
        <br />
        <span style={{fontSize: '14px', color: '#00ffe5', marginTop: '10px', display: 'block'}}>- Happy User</span>
      </ReviewBox>

      <ButtonGroup style={{marginTop: '30px'}}>
        <Button 
          onClick={() => (window.location.href = "/review/garage/2")}
          style={{background: 'linear-gradient(135deg, #00cccc 0%, #00ffe5 100%)', color: '#0d1117', fontWeight: '600'}}
        >
          🎬 See Live Demo
        </Button>
        <Button 
          onClick={() => (window.location.href = "/")}
          style={{borderColor: '#9d4edd'}}
        >
          🏠 Go Back Home
        </Button>
      </ButtonGroup>

      <div style={{marginTop: '40px', fontSize: '14px', color: '#8b949e', maxWidth: '500px'}}>
        <p>📱 <strong>Fully Responsive</strong> - Works perfectly on desktop, tablet, and mobile devices</p>
        <p>⚡ <strong>Lightning Fast</strong> - Generate reviews in seconds, not minutes</p>
      </div>
    </Container>
  );
};

export default Landing;