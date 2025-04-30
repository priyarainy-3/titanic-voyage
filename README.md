
# Titanic Survival Prediction using Supervised Learning

## Project Overview

This project aims to predict passenger survival on the RMS Titanic using supervised machine learning techniques. Based on the classic Kaggle dataset, it involves a comprehensive workflow including data loading, exploratory data analysis (EDA), data cleaning, feature engineering, model training (Logistic Regression and Decision Tree Classifier), and performance evaluation. The goal is to build and compare models that can effectively classify whether a passenger survived the disaster based on available features.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Objectives](#objectives)
-   [Dataset](#dataset)
-   [Methodology](#methodology)
    -   [1. Data Loading & Exploration](#1-data-loading--exploration)
    -   [2. Data Cleaning](#2-data-cleaning)
    -   [3. Feature Engineering](#3-feature-engineering)
    -   [4. Data Preprocessing](#4-data-preprocessing)
    -   [5. Data Splitting](#5-data-splitting)
    -   [6. Model Training](#6-model-training)
    -   [7. Model Evaluation](#7-model-evaluation)
    -   [8. Comparison](#8-comparison)
-   [Technologies Used](#technologies-used)
-   [File Structure](#file-structure)
-   [Setup and Installation](#setup-and-installation)
-   [Usage](#usage)
-   [Results Summary](#results-summary)
-   [Future Work](#future-work)

## Objectives

*   Load and inspect the Titanic dataset (`train.csv`).
*   Perform thorough EDA to understand data characteristics and identify issues like missing values.
*   Clean the data by handling missing values in `Age`, `Embarked`, and `Cabin`.
*   Engineer relevant features (`Title`, `FamilySize`, `IsAlone`) to potentially improve model performance.
*   Preprocess the data, including One-Hot Encoding for categorical features and Feature Scaling for numerical features.
*   Split the data into training and testing sets.
*   Train two supervised learning models:
    *   Logistic Regression
    *   Decision Tree Classifier
*   Evaluate the models using standard classification metrics (Accuracy, Precision, Recall, F1-Score, Confusion Matrix).
*   Compare the performance of the two models on the test set.

## Dataset

The dataset used is the standard Titanic dataset, typically sourced from the Kaggle competition: [Titanic - Machine Learning from Disaster](https://www.kaggle.com/c/titanic).

*   **Source File:** `train.csv`
*   **Target Variable:** `Survived` (0 = No, 1 = Yes)
*   **Key Features:** `Pclass`, `Sex`, `Age`, `SibSp`, `Parch`, `Fare`, `Embarked`, `Name`, `Ticket`, `Cabin`.

## Methodology

The project follows these key steps:

### 1. Data Loading & Exploration
-   Load `train.csv` using pandas.
-   Initial inspection using `.head()`, `.info()`, `.describe()`, `.shape`.
-   Analyze missing data patterns.

### 2. Data Cleaning
-   **Age:** Impute missing values using the median (potentially grouped by `Pclass` or engineered `Title`).
-   **Embarked:** Impute missing values using the mode.
-   **Cabin:** Handle missing values by either dropping the column or creating a `HasCabin` binary feature before dropping the original.

### 3. Feature Engineering
-   **Title:** Extract passenger titles (Mr, Mrs, Miss, etc.) from the `Name` column. Consolidate rare titles.
-   **FamilySize:** Create `FamilySize` = `SibSp` + `Parch` + 1.
-   **IsAlone:** Create a binary feature based on `FamilySize`.
-   **Drop Features:** Remove redundant or processed columns (`PassengerId`, `Name`, `Ticket`, `Cabin` (if strategy dictates), `SibSp`, `Parch`).

### 4. Data Preprocessing
-   **Categorical Encoding:** Apply One-Hot Encoding to `Sex`, `Embarked`, `Title`, and potentially `Pclass`. Use `drop='first'` to avoid multicollinearity.
-   **Feature Scaling:** Apply `StandardScaler` to numerical features (`Age`, `Fare`, `FamilySize`). Fit scaler *only* on training data.

### 5. Data Splitting
-   Separate features (X) and target (y).
-   Split data into training (80%) and testing (20%) sets using `train_test_split` with stratification (`stratify=y`) and a fixed `random_state`.

### 6. Model Training
-   Instantiate and train `LogisticRegression` on the scaled training data.
-   Instantiate and train `DecisionTreeClassifier` (potentially with `max_depth` constraint) on the scaled training data. Use a fixed `random_state`.

### 7. Model Evaluation
-   Make predictions on the scaled test set for both models.
-   Calculate and display:
    *   Accuracy Score
    *   Precision Score
    *   Recall Score
    *   F1 Score
    *   Confusion Matrix (visualized)
    *   Classification Report

### 8. Comparison
-   Compare the evaluation metrics of Logistic Regression and the Decision Tree Classifier to determine which model performed better on the test set for this specific task and data preparation pipeline.

## Technologies Used

*   **Python:** 3.7+
*   **Core Libraries:**
    *   pandas
    *   numpy
    *   scikit-learn (`train_test_split`, `LogisticRegression`, `DecisionTreeClassifier`, `StandardScaler`, `OneHotEncoder`, evaluation metrics)
    *   matplotlib (for visualization, optional)
    *   seaborn (for visualization, optional)

## File Structure


.
├── titanic_survival_prediction.py # Or titanic_survival_prediction.ipynb
├── train.csv # Input dataset (needs to be present)
└── README.md # This file

*(Optional: Add requirements.txt)*
IGNORE_WHEN_COPYING_START
content_copy
download
Use code with caution.
IGNORE_WHEN_COPYING_END

├── requirements.txt # Project dependencies

## Setup and Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Create a virtual environment (recommended):**
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3.  **Install dependencies:**
    *   If `requirements.txt` is provided:
        ```bash
        pip install -r requirements.txt
        ```
    *   Otherwise, install manually:
        ```bash
        pip install pandas numpy scikit-learn matplotlib seaborn
        ```
4.  **Ensure Dataset:** Place the `train.csv` file in the root directory of the project, or update the file path in the script/notebook accordingly.

## Usage

1.  **Activate the virtual environment:**
    ```bash
    source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
    ```
2.  **Run the script/notebook:**
    *   If using a Python script (`.py`):
        ```bash
        python titanic_survival_prediction.py
        ```
    *   If using a Jupyter Notebook (`.ipynb`):
        Open Jupyter Lab or Notebook:
        ```bash
        jupyter lab
        ```
        Then open and run the cells within the `titanic_survival_prediction.ipynb` notebook.

The script/notebook will execute the entire pipeline and print the evaluation metrics and confusion matrices for both the Logistic Regression and Decision Tree models.

## Results Summary

The output will include:

*   Performance metrics (Accuracy, Precision, Recall, F1-Score) for both models on the test set.
*   Confusion matrices for both models.
*   A brief comparison highlighting which model performed better based on the evaluation result
