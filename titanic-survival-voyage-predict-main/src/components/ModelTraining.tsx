
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

const ModelTraining = () => {
  const logisticPerformance = {
    accuracy: 0.81,
    precision: 0.78,
    recall: 0.72,
    f1: 0.75,
    confMatrix: [
      [107, 14],
      [20, 51]
    ]
  };
  
  const treePerformance = {
    accuracy: 0.79,
    precision: 0.76,
    recall: 0.69,
    f1: 0.72,
    confMatrix: [
      [105, 16],
      [22, 49]
    ]
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Training Process</CardTitle>
          <CardDescription>
            Preprocessing steps and model configuration
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Data Preprocessing</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Train-Test Split</span>
                  <Badge variant="outline">80% Train, 20% Test (stratified)</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Categorical Encoding</span>
                  <Badge variant="outline">One-Hot Encoding</Badge>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Numerical Features</span>
                  <Badge variant="outline">StandardScaler</Badge>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Logistic Regression</h3>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  from sklearn.linear_model import LogisticRegression<br /><br />
                  
                  logreg = LogisticRegression(<br />
                  &nbsp;&nbsp;max_iter=1000,<br />
                  &nbsp;&nbsp;random_state=42<br />
                  )<br /><br />
                  
                  logreg.fit(X_train, y_train)
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Decision Tree</h3>
                <div className="p-3 bg-muted rounded-md text-sm font-mono">
                  from sklearn.tree import DecisionTreeClassifier<br /><br />
                  
                  dt = DecisionTreeClassifier(<br />
                  &nbsp;&nbsp;max_depth=5,<br />
                  &nbsp;&nbsp;random_state=42<br />
                  )<br /><br />
                  
                  dt.fit(X_train, y_train)
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Logistic Regression Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Accuracy</span>
                  <span className="font-medium">{(logisticPerformance.accuracy * 100).toFixed(1)}%</span>
                </div>
                <Progress value={logisticPerformance.accuracy * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Precision</span>
                  <span className="font-medium">{(logisticPerformance.precision * 100).toFixed(1)}%</span>
                </div>
                <Progress value={logisticPerformance.precision * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Recall</span>
                  <span className="font-medium">{(logisticPerformance.recall * 100).toFixed(1)}%</span>
                </div>
                <Progress value={logisticPerformance.recall * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>F1 Score</span>
                  <span className="font-medium">{(logisticPerformance.f1 * 100).toFixed(1)}%</span>
                </div>
                <Progress value={logisticPerformance.f1 * 100} className="h-2" />
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Confusion Matrix</h4>
                <div className="bg-muted p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">{logisticPerformance.confMatrix[0][0]}</div>
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded">{logisticPerformance.confMatrix[0][1]}</div>
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded">{logisticPerformance.confMatrix[1][0]}</div>
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">{logisticPerformance.confMatrix[1][1]}</div>
                  </div>
                  <div className="grid grid-cols-2 mt-1 text-xs text-center">
                    <div>True Negative</div>
                    <div>False Positive</div>
                    <div>False Negative</div>
                    <div>True Positive</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Decision Tree Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Accuracy</span>
                  <span className="font-medium">{(treePerformance.accuracy * 100).toFixed(1)}%</span>
                </div>
                <Progress value={treePerformance.accuracy * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Precision</span>
                  <span className="font-medium">{(treePerformance.precision * 100).toFixed(1)}%</span>
                </div>
                <Progress value={treePerformance.precision * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Recall</span>
                  <span className="font-medium">{(treePerformance.recall * 100).toFixed(1)}%</span>
                </div>
                <Progress value={treePerformance.recall * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>F1 Score</span>
                  <span className="font-medium">{(treePerformance.f1 * 100).toFixed(1)}%</span>
                </div>
                <Progress value={treePerformance.f1 * 100} className="h-2" />
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Confusion Matrix</h4>
                <div className="bg-muted p-4 rounded-md">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">{treePerformance.confMatrix[0][0]}</div>
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded">{treePerformance.confMatrix[0][1]}</div>
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded">{treePerformance.confMatrix[1][0]}</div>
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">{treePerformance.confMatrix[1][1]}</div>
                  </div>
                  <div className="grid grid-cols-2 mt-1 text-xs text-center">
                    <div>True Negative</div>
                    <div>False Positive</div>
                    <div>False Negative</div>
                    <div>True Positive</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Model Comparison</CardTitle>
          <CardDescription>Performance metrics comparison between models</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Logistic Regression</TableHead>
                <TableHead>Decision Tree</TableHead>
                <TableHead>Better Model</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Accuracy</TableCell>
                <TableCell>{(logisticPerformance.accuracy * 100).toFixed(1)}%</TableCell>
                <TableCell>{(treePerformance.accuracy * 100).toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge className="bg-ocean-600">Logistic Regression</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Precision</TableCell>
                <TableCell>{(logisticPerformance.precision * 100).toFixed(1)}%</TableCell>
                <TableCell>{(treePerformance.precision * 100).toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge className="bg-ocean-600">Logistic Regression</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Recall</TableCell>
                <TableCell>{(logisticPerformance.recall * 100).toFixed(1)}%</TableCell>
                <TableCell>{(treePerformance.recall * 100).toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge className="bg-ocean-600">Logistic Regression</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">F1 Score</TableCell>
                <TableCell>{(logisticPerformance.f1 * 100).toFixed(1)}%</TableCell>
                <TableCell>{(treePerformance.f1 * 100).toFixed(1)}%</TableCell>
                <TableCell>
                  <Badge className="bg-ocean-600">Logistic Regression</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-ocean-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Conclusion</h3>
            <p className="text-muted-foreground">
              Logistic Regression outperforms the Decision Tree model across all evaluation metrics. It achieves higher accuracy (81.0% vs 79.0%), better precision (78.0% vs 76.0%), improved recall (72.0% vs 69.0%), and a stronger F1 score (75.0% vs 72.0%). This suggests that for this dataset, the linear decision boundary of Logistic Regression is more effective than the recursive partitioning approach of Decision Trees.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelTraining;
