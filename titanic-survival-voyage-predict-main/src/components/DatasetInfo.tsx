
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample data - in a real app this would come from an API or file upload
const sampleData = [
  { PassengerId: 1, Survived: 0, Pclass: 3, Name: "Braund, Mr. Owen Harris", Sex: "male", Age: 22, SibSp: 1, Parch: 0, Ticket: "A/5 21171", Fare: 7.25, Cabin: null, Embarked: "S" },
  { PassengerId: 2, Survived: 1, Pclass: 1, Name: "Cumings, Mrs. John Bradley (Florence Briggs Thayer)", Sex: "female", Age: 38, SibSp: 1, Parch: 0, Ticket: "PC 17599", Fare: 71.2833, Cabin: "C85", Embarked: "C" },
  { PassengerId: 3, Survived: 1, Pclass: 3, Name: "Heikkinen, Miss. Laina", Sex: "female", Age: 26, SibSp: 0, Parch: 0, Ticket: "STON/O2. 3101282", Fare: 7.925, Cabin: null, Embarked: "S" },
  { PassengerId: 4, Survived: 1, Pclass: 1, Name: "Futrelle, Mrs. Jacques Heath (Lily May Peel)", Sex: "female", Age: 35, SibSp: 1, Parch: 0, Ticket: "113803", Fare: 53.1, Cabin: "C123", Embarked: "S" },
  { PassengerId: 5, Survived: 0, Pclass: 3, Name: "Allen, Mr. William Henry", Sex: "male", Age: 35, SibSp: 0, Parch: 0, Ticket: "373450", Fare: 8.05, Cabin: null, Embarked: "S" },
];

const columnDescriptions = [
  { name: 'PassengerId', description: 'Unique ID for each passenger' },
  { name: 'Survived', description: 'Target variable: 0 = No, 1 = Yes' },
  { name: 'Pclass', description: 'Passenger class: 1 = 1st, 2 = 2nd, 3 = 3rd' },
  { name: 'Name', description: 'Passenger name' },
  { name: 'Sex', description: 'Passenger gender' },
  { name: 'Age', description: 'Passenger age' },
  { name: 'SibSp', description: 'Number of siblings/spouses aboard' },
  { name: 'Parch', description: 'Number of parents/children aboard' },
  { name: 'Ticket', description: 'Ticket number' },
  { name: 'Fare', description: 'Passenger fare' },
  { name: 'Cabin', description: 'Cabin number' },
  { name: 'Embarked', description: 'Port of embarkation: C = Cherbourg, Q = Queenstown, S = Southampton' },
];

const DatasetInfo = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dataset Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Records:</span>
              <Badge variant="secondary" className="text-lg">891</Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Features:</span>
              <Badge variant="secondary" className="text-lg">12</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Target Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <span className="text-muted-foreground">Not Survived:</span>
              </div>
              <Badge variant="destructive">549 (61.6%)</Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">Survived:</span>
              </div>
              <Badge variant="default">342 (38.4%)</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Missing Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Age:</span>
              <Badge variant="outline">177 (19.9%)</Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Cabin:</span>
              <Badge variant="outline">687 (77.1%)</Badge>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-muted-foreground">Embarked:</span>
              <Badge variant="outline">2 (0.2%)</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dataset Preview</CardTitle>
          <CardDescription>First 5 rows of the Titanic dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.keys(sampleData[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleData.map((row, i) => (
                  <TableRow key={i}>
                    {Object.values(row).map((value: any, j) => (
                      <TableCell key={j}>
                        {value === null ? (
                          <span className="text-muted-foreground italic">null</span>
                        ) : (
                          value.toString()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Feature Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {columnDescriptions.map((col) => (
              <div key={col.name} className="flex justify-between items-center p-2 border rounded-md">
                <span className="font-medium">{col.name}</span>
                <span className="text-muted-foreground text-sm">{col.description}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatasetInfo;
