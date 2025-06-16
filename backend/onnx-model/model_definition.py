import torch
from torch import nn
from transformers import AutoModelForSequenceClassification

class EmotionStressModel(nn.Module):
    def __init__(self, model_name, num_emotions=28):
        super(EmotionStressModel, self).__init__()
        
        # Choose the base model with output_hidden_states=True in config
        config_kwargs = {
            'num_labels': num_emotions,
            'problem_type': 'multi_label_classification',
            'output_hidden_states': True
        }
        
        if 'deberta' in model_name.lower():
            self.base_model = AutoModelForSequenceClassification.from_pretrained(
                model_name, **config_kwargs
            )
        elif 'bert' in model_name.lower():
            self.base_model = AutoModelForSequenceClassification.from_pretrained(
                model_name, **config_kwargs
            )
        else:
            raise ValueError(f"Unsupported model: {model_name}")
        
        # Get the hidden size from the base model config
        hidden_size = self.base_model.config.hidden_size
        
        # Additional regression heads for metrics
        self.happy_head = nn.Sequential(
            nn.Linear(hidden_size, 64),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
        
        self.sad_head = nn.Sequential(
            nn.Linear(hidden_size, 64),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
        
        self.neutral_head = nn.Sequential(
            nn.Linear(hidden_size, 64),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
        
        self.stress_head = nn.Sequential(
            nn.Linear(hidden_size, 128),
            nn.ReLU(),
            nn.Dropout(0.1),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1),
            nn.Sigmoid()
        )
        
    def forward(self, input_ids, attention_mask, token_type_ids=None, labels=None):
        # Get the base model outputs
        outputs = self.base_model(
            input_ids=input_ids,
            attention_mask=attention_mask,
            token_type_ids=token_type_ids,
            labels=labels
        )
        
        # Get the hidden states from the last layer
        hidden_states = outputs.hidden_states[-1]
        
        # Use the [CLS] token representation for the regression heads
        cls_output = hidden_states[:, 0, :]
        
        # Get the emotion logits from the base model
        emotion_logits = outputs.logits
        
        # Calculate the metric scores (scale to the required ranges)
        happy_score = self.happy_head(cls_output) * 10  # Scale to 0-10
        sad_score = self.sad_head(cls_output) * 10      # Scale to 0-10
        neutral_score = self.neutral_head(cls_output) * 10  # Scale to 0-10
        stress_level = self.stress_head(cls_output) * 100  # Scale to 0-100
        
        return {
            'emotion_logits': emotion_logits,
            'happy_score': happy_score,
            'sad_score': sad_score,
            'neutral_score': neutral_score,
            'stress_level': stress_level,
            'loss': outputs.loss if labels is not None else None
        }
