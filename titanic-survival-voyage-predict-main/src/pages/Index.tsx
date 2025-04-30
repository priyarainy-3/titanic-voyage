
import React from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DatasetInfo from '@/components/DatasetInfo';
import DataCleaning from '@/components/DataCleaning';
import ModelTraining from '@/components/ModelTraining';
import PredictionForm from '@/components/PredictionForm';
import CodeSample from '@/components/CodeSample';
import { Ship, Database, BrainCircuit, FileCode, Waves, LineChart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 gradient-heading">Titanic Survival Prediction</h1>
          <p className="text-muted-foreground text-lg">
            A supervised machine learning project applying Logistic Regression and Decision Trees
            to predict passenger survival on the Titanic.
          </p>
        </div>
        
        <Tabs defaultValue="dataset" className="space-y-8">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="dataset" className="flex items-center gap-2">
              <Database className="h-4 w-4" /> Dataset
            </TabsTrigger>
            <TabsTrigger value="cleaning" className="flex items-center gap-2">
              <Waves className="h-4 w-4" /> Data Cleaning
            </TabsTrigger>
            <TabsTrigger value="modeling" className="flex items-center gap-2">
              <BrainCircuit className="h-4 w-4" /> Model Training
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <Ship className="h-4 w-4" /> Prediction
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" /> Python Code
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dataset">
            <DatasetInfo />
          </TabsContent>
          
          <TabsContent value="cleaning">
            <DataCleaning />
          </TabsContent>
          
          <TabsContent value="modeling">
            <ModelTraining />
          </TabsContent>
          
          <TabsContent value="prediction">
            <PredictionForm />
          </TabsContent>
          
          <TabsContent value="code">
            <CodeSample />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="border-t py-6 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Ship className="h-4 w-4" />
            <span>Titanic Survival Prediction</span>
          </div>
          <div className="mt-2 md:mt-0">
            <p>A demonstration of data science and machine learning concepts</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
