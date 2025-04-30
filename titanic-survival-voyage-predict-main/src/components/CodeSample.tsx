
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CodeSample = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Python Code</CardTitle>
        <CardDescription>
          Full code implementation for Titanic survival prediction
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="setup">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="setup">Setup & Loading</TabsTrigger>
            <TabsTrigger value="cleaning">Data Cleaning</TabsTrigger>
            <TabsTrigger value="modeling">Modeling</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="setup" className="p-4 bg-muted rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code>
{`# Import necessary libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import accuracy_score, precision_score, recall_score
from sklearn.metrics import f1_score, confusion_matrix, classification_report

# Load the dataset
df = pd.read_csv('train.csv')

# Initial inspection
print(df.head())
print(df.info())
print(df.describe())
print(f"Dataset shape: {df.shape}")

# Check missing values
missing_values = df.isnull().sum() / len(df) * 100
print("Missing values (%):")
print(missing_values[missing_values > 0])

# Visualize missing data
plt.figure(figsize=(10, 6))
sns.heatmap(df.isnull(), yticklabels=False, cbar=False, cmap='viridis')
plt.title('Missing Value Heatmap')
plt.tight_layout()
plt.show()

# Basic EDA
plt.figure(figsize=(12, 5))

plt.subplot(1, 2, 1)
sns.countplot(x='Survived', data=df)
plt.title('Survival Count')

plt.subplot(1, 2, 2)
sns.countplot(x='Pclass', hue='Survived', data=df)
plt.title('Survival by Passenger Class')

plt.tight_layout()
plt.show()

# Age distribution
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.histplot(df['Age'].dropna(), kde=True)
plt.title('Age Distribution')

plt.subplot(1, 2, 2)
sns.boxplot(x='Survived', y='Age', data=df)
plt.title('Age vs Survival')

plt.tight_layout()
plt.show()`}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="cleaning" className="p-4 bg-muted rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code>
{`# Feature Engineering: Extract titles from names
df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\\.', expand=False)

# Grouping rare titles
rare_titles = ['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona']
df['Title'] = df['Title'].replace(rare_titles, 'Rare')
df['Title'] = df['Title'].replace('Mlle', 'Miss')
df['Title'] = df['Title'].replace('Ms', 'Miss')
df['Title'] = df['Title'].replace('Mme', 'Mrs')

# Impute missing Age values based on Title and Pclass
df['Age'] = df.groupby(['Title', 'Pclass'])['Age'].transform(
    lambda x: x.fillna(x.median()))

# If any age values are still missing, use median of all ages
df['Age'] = df['Age'].fillna(df['Age'].median())

# Fill missing Embarked values with the mode
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

# Create a binary feature for Cabin
df['HasCabin'] = df['Cabin'].notna().astype(int)

# Create family size feature
df['FamilySize'] = df['SibSp'] + df['Parch'] + 1

# Create IsAlone feature
df['IsAlone'] = (df['FamilySize'] == 1).astype(int)

# Drop unnecessary columns
df = df.drop(['Name', 'Ticket', 'Cabin', 'SibSp', 'Parch', 'PassengerId'], axis=1)

# Encode categorical variables
# Convert Sex to numeric
df['Sex'] = df['Sex'].map({'male': 0, 'female': 1})

# One-hot encode categorical features
categorical_features = ['Embarked', 'Title', 'Pclass']
df_encoded = pd.get_dummies(df, columns=categorical_features, drop_first=True)

print("Transformed dataset shape:", df_encoded.shape)
print(df_encoded.head())

# Verify no missing values remain
missing_check = df_encoded.isnull().sum()
print("Missing values after preprocessing:")
print(missing_check[missing_check > 0])`}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="modeling" className="p-4 bg-muted rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code>
{`# Separate features and target variable
X = df_encoded.drop('Survived', axis=1)
y = df_encoded['Survived']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training set: {X_train.shape[0]} samples")
print(f"Testing set: {X_test.shape[0]} samples")

# Scale numerical features
scaler = StandardScaler()
numerical_features = ['Age', 'Fare', 'FamilySize']

X_train[numerical_features] = scaler.fit_transform(X_train[numerical_features])
X_test[numerical_features] = scaler.transform(X_test[numerical_features])

# Train Logistic Regression model
logreg = LogisticRegression(max_iter=1000, random_state=42)
logreg.fit(X_train, y_train)

# Train Decision Tree model
dt = DecisionTreeClassifier(max_depth=5, random_state=42)
dt.fit(X_train, y_train)

# Alternative approach using sklearn Pipelines
# Define which columns should be encoded vs scaled
# numerical_features = ['Age', 'Fare', 'FamilySize']
# categorical_features = ['Embarked', 'Title', 'Pclass']

# # Preprocessing for numerical data
# numerical_transformer = StandardScaler()

# # Preprocessing for categorical data
# categorical_transformer = OneHotEncoder(drop='first')

# # Bundle preprocessing for numerical and categorical data
# preprocessor = ColumnTransformer(
#     transformers=[
#         ('num', numerical_transformer, numerical_features),
#         ('cat', categorical_transformer, categorical_features)
#     ])

# # Create a preprocessing and training pipeline for each model
# logreg_pipeline = Pipeline(steps=[
#     ('preprocessor', preprocessor),
#     ('classifier', LogisticRegression(max_iter=1000, random_state=42))
# ])

# dt_pipeline = Pipeline(steps=[
#     ('preprocessor', preprocessor),
#     ('classifier', DecisionTreeClassifier(max_depth=5, random_state=42))
# ])

# # Train the models
# logreg_pipeline.fit(X_train, y_train)
# dt_pipeline.fit(X_train, y_train)`}
              </code>
            </pre>
          </TabsContent>
          
          <TabsContent value="evaluation" className="p-4 bg-muted rounded-md">
            <pre className="text-sm overflow-x-auto">
              <code>
{`# Make predictions
y_pred_logreg = logreg.predict(X_test)
y_pred_dt = dt.predict(X_test)

# Evaluate Logistic Regression
print("Logistic Regression Performance:")
print(f"Accuracy: {accuracy_score(y_test, y_pred_logreg):.3f}")
print(f"Precision: {precision_score(y_test, y_pred_logreg):.3f}")
print(f"Recall: {recall_score(y_test, y_pred_logreg):.3f}")
print(f"F1 Score: {f1_score(y_test, y_pred_logreg):.3f}")

# Confusion Matrix for Logistic Regression
cm_logreg = confusion_matrix(y_test, y_pred_logreg)
plt.figure(figsize=(8, 6))
sns.heatmap(cm_logreg, annot=True, fmt="d", cmap="Blues", 
            xticklabels=["Not Survived", "Survived"],
            yticklabels=["Not Survived", "Survived"])
plt.title("Confusion Matrix - Logistic Regression")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.show()

print("\\nClassification Report - Logistic Regression:")
print(classification_report(y_test, y_pred_logreg))

# Evaluate Decision Tree
print("\\nDecision Tree Performance:")
print(f"Accuracy: {accuracy_score(y_test, y_pred_dt):.3f}")
print(f"Precision: {precision_score(y_test, y_pred_dt):.3f}")
print(f"Recall: {recall_score(y_test, y_pred_dt):.3f}")
print(f"F1 Score: {f1_score(y_test, y_pred_dt):.3f}")

# Confusion Matrix for Decision Tree
cm_dt = confusion_matrix(y_test, y_pred_dt)
plt.figure(figsize=(8, 6))
sns.heatmap(cm_dt, annot=True, fmt="d", cmap="Greens", 
            xticklabels=["Not Survived", "Survived"],
            yticklabels=["Not Survived", "Survived"])
plt.title("Confusion Matrix - Decision Tree")
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.tight_layout()
plt.show()

print("\\nClassification Report - Decision Tree:")
print(classification_report(y_test, y_pred_dt))

# Feature importance for Logistic Regression
logreg_coef = pd.DataFrame({
    'Feature': X_train.columns,
    'Coefficient': logreg.coef_[0]
})
logreg_coef = logreg_coef.sort_values(by='Coefficient', ascending=False)

plt.figure(figsize=(12, 8))
sns.barplot(x='Coefficient', y='Feature', data=logreg_coef)
plt.title('Logistic Regression Coefficients')
plt.tight_layout()
plt.show()

# Feature importance for Decision Tree
dt_importance = pd.DataFrame({
    'Feature': X_train.columns,
    'Importance': dt.feature_importances_
})
dt_importance = dt_importance.sort_values(by='Importance', ascending=False)

plt.figure(figsize=(12, 8))
sns.barplot(x='Importance', y='Feature', data=dt_importance)
plt.title('Decision Tree Feature Importance')
plt.tight_layout()
plt.show()

# Model comparison summary
models = ['Logistic Regression', 'Decision Tree']
accuracy = [accuracy_score(y_test, y_pred_logreg), accuracy_score(y_test, y_pred_dt)]
precision = [precision_score(y_test, y_pred_logreg), precision_score(y_test, y_pred_dt)]
recall = [recall_score(y_test, y_pred_logreg), recall_score(y_test, y_pred_dt)]
f1 = [f1_score(y_test, y_pred_logreg), f1_score(y_test, y_pred_dt)]

comparison = pd.DataFrame({
    'Model': models,
    'Accuracy': accuracy,
    'Precision': precision,
    'Recall': recall,
    'F1 Score': f1
})

print("\\nModel Comparison:")
print(comparison)

# Visualize model comparison
plt.figure(figsize=(12, 6))
comparison_melted = pd.melt(comparison, id_vars=['Model'], var_name='Metric', value_name='Score')
sns.barplot(x='Model', y='Score', hue='Metric', data=comparison_melted)
plt.title('Model Performance Comparison')
plt.ylim(0, 1.0)
plt.tight_layout()
plt.show()

# Conclusion
better_model = 'Logistic Regression' if accuracy[0] > accuracy[1] else 'Decision Tree'
print(f"\\nConclusion: {better_model} performs better in predicting Titanic survival.")`}
              </code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeSample;
