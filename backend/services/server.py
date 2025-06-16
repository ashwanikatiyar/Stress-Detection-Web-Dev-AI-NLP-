from flask import Flask, request, jsonify
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
analyzer = SentimentIntensityAnalyzer()

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.json
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    score = analyzer.polarity_scores(text)
    return jsonify(score)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)

# Fix the Issue Step-by-Step
# 1️⃣ Activate the Virtual Environment
# Run this command inside the backend directory:


#     source myvenv/bin/activate

# If Flask is missing, reinstall it:


#        pip install flask

#       python3 server.py




# Admin dashboard - 

# id should be replaced by reg no

# It should also try to detect the mental health condition : Depression , anxiety etc
