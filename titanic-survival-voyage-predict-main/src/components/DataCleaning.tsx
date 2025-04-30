
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, AlertTriangle } from 'lucide-react';

const DataCleaning = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Missing Value Handling</CardTitle>
          <CardDescription>
            Strategies applied to handle missing values in the dataset
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-ocean-600">Age</Badge>
              <h3 className="text-lg font-medium">Age Imputation</h3>
            </div>
            <div className="pl-6 border-l-2 border-ocean-200">
              <p className="text-muted-foreground">Missing values in the Age column (19.9%) are imputed using the median age grouped by passenger class (Pclass) and title extracted from Name.</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df['Age'] = df.groupby(['Pclass', 'Title'])['Age'].transform(<br />
                &nbsp;&nbsp;lambda x: x.fillna(x.median()))
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">This approach provides more accurate age estimates by considering socioeconomic class and title.</span>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-ocean-600">Embarked</Badge>
              <h3 className="text-lg font-medium">Port of Embarkation</h3>
            </div>
            <div className="pl-6 border-l-2 border-ocean-200">
              <p className="text-muted-foreground">Missing Embarked values (only 0.2% of the data) are filled with the most frequent port, Southampton (S).</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Mode imputation is appropriate given the categorical nature and low missing percentage.</span>
              </div>
            </div>
          </div>

          <Separator />
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-ocean-600">Cabin</Badge>
              <h3 className="text-lg font-medium">Cabin Information</h3>
            </div>
            <div className="pl-6 border-l-2 border-ocean-200">
              <p className="text-muted-foreground">The Cabin column has 77.1% missing values, making direct imputation unreliable. Instead of dropping it entirely, we create a new binary feature:</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df['HasCabin'] = df['Cabin'].notna().astype(int)
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Having a cabin may indicate higher wealth status, potentially correlating with survival.</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span className="text-sm">The original Cabin column is dropped after extracting this information.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Engineering</CardTitle>
          <CardDescription>
            New features created from the existing dataset to improve model performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-deep-600">Title</Badge>
              <h3 className="text-lg font-medium">Title Extraction</h3>
            </div>
            <div className="pl-6 border-l-2 border-deep-200">
              <p className="text-muted-foreground">Extract titles from passenger names and group rare titles.</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df['Title'] = df['Name'].str.extract(' ([A-Za-z]+)\.', expand=False)<br />
                df['Title'] = df['Title'].replace(['Lady', 'Countess', 'Capt', 'Col', 'Don', 'Dr', 'Major', 'Rev', 'Sir', 'Jonkheer', 'Dona'], 'Rare')<br />
                df['Title'] = df['Title'].replace('Mlle', 'Miss')<br />
                df['Title'] = df['Title'].replace('Ms', 'Miss')<br />
                df['Title'] = df['Title'].replace('Mme', 'Mrs')
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-deep-600">Family</Badge>
              <h3 className="text-lg font-medium">Family Size & IsAlone</h3>
            </div>
            <div className="pl-6 border-l-2 border-deep-200">
              <p className="text-muted-foreground">Create family size feature and identify passengers traveling alone.</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df['FamilySize'] = df['SibSp'] + df['Parch'] + 1<br />
                df['IsAlone'] = (df['FamilySize'] == 1).astype(int)
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Family dynamics may have influenced survival probability.</span>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-deep-600">Cleanup</Badge>
              <h3 className="text-lg font-medium">Drop Redundant Features</h3>
            </div>
            <div className="pl-6 border-l-2 border-deep-200">
              <p className="text-muted-foreground">Remove original features that are now redundant after feature engineering:</p>
              <div className="mt-2 p-3 bg-muted rounded-md text-sm font-mono">
                df = df.drop(['Name', 'Ticket', 'Cabin', 'SibSp', 'Parch', 'PassengerId'], axis=1)
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">Reduces dimensionality and focuses on the most informative features.</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataCleaning;
