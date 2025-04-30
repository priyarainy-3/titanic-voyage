
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface PredictionResult {
  survived: boolean;
  probability: number;
  model: string;
}

const PredictionForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  
  // Form state
  const [pclass, setPclass] = useState('3');
  const [sex, setSex] = useState('male');
  const [age, setAge] = useState(30);
  const [fare, setFare] = useState(20);
  const [embarked, setEmbarked] = useState('S');
  const [hasCabin, setHasCabin] = useState(false);
  const [familySize, setFamilySize] = useState(1);
  const [title, setTitle] = useState('Mr');
  const [selectedModel, setSelectedModel] = useState('logistic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // This is a simplified prediction logic based on our models
      let probability = 0;
      
      // Very basic approximation based on the training data patterns
      // In a real app, this would call a backend API with the actual model
      if (sex === 'female') probability += 0.5;
      if (pclass === '1') probability += 0.25;
      if (parseInt(pclass) === 3) probability -= 0.15;
      if (age < 12) probability += 0.2;
      if (age > 60) probability -= 0.1;
      if (hasCabin) probability += 0.15;
      if (fare > 100) probability += 0.1;
      if (familySize > 5) probability -= 0.1;
      if (familySize === 1) probability -= 0.05;
      if (title === 'Mrs' || title === 'Miss') probability += 0.1;
      
      // Add some randomness to simulate model differences
      const modelAdjustment = selectedModel === 'logistic' ? 0.03 : -0.02;
      probability = Math.max(0, Math.min(1, probability + modelAdjustment));
      
      setResult({
        survived: probability > 0.5,
        probability: parseFloat(probability.toFixed(2)),
        model: selectedModel === 'logistic' ? 'Logistic Regression' : 'Decision Tree'
      });
      
      setIsLoading(false);
      
      toast({
        title: "Prediction Complete",
        description: "The model has evaluated the passenger data.",
      });
    }, 1500);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Passenger Prediction</CardTitle>
          <CardDescription>Enter passenger details to predict survival</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pclass">Passenger Class</Label>
                <Select value={pclass} onValueChange={setPclass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st Class</SelectItem>
                    <SelectItem value="2">2nd Class</SelectItem>
                    <SelectItem value="3">3rd Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sex">Gender</Label>
                <Select value={sex} onValueChange={setSex}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="age">Age: {age}</Label>
              </div>
              <Slider 
                id="age" 
                min={0} 
                max={80} 
                step={1} 
                defaultValue={[age]} 
                onValueChange={(value) => setAge(value[0])} 
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="fare">Fare: £{fare}</Label>
              </div>
              <Slider 
                id="fare" 
                min={0} 
                max={200} 
                step={1} 
                defaultValue={[fare]} 
                onValueChange={(value) => setFare(value[0])} 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="embarked">Port of Embarkation</Label>
                <Select value={embarked} onValueChange={setEmbarked}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select port" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="C">Cherbourg</SelectItem>
                    <SelectItem value="Q">Queenstown</SelectItem>
                    <SelectItem value="S">Southampton</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Select value={title} onValueChange={setTitle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select title" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mr">Mr</SelectItem>
                    <SelectItem value="Mrs">Mrs</SelectItem>
                    <SelectItem value="Miss">Miss</SelectItem>
                    <SelectItem value="Master">Master</SelectItem>
                    <SelectItem value="Rare">Rare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="familySize">Family Size</Label>
                <Input 
                  id="familySize" 
                  type="number" 
                  min={1} 
                  max={10} 
                  value={familySize} 
                  onChange={(e) => setFamilySize(parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between pt-6">
                <Label htmlFor="hasCabin">Has Cabin</Label>
                <Switch 
                  id="hasCabin" 
                  checked={hasCabin} 
                  onCheckedChange={setHasCabin} 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Prediction Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="logistic">Logistic Regression</SelectItem>
                  <SelectItem value="tree">Decision Tree</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-ocean-600 hover:bg-ocean-700" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Processing
              </>
            ) : (
              'Predict Survival'
            )}
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
          <CardDescription>Model evaluation of survival probability</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-6">
          {result ? (
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${result.survived ? 'text-primary' : 'text-destructive'}`}>
                {result.survived ? 'Survived' : 'Did Not Survive'}
              </div>
              <div className="text-xl mb-2">
                Survival Probability: {(result.probability * 100).toFixed(1)}%
              </div>
              <div className="text-muted-foreground">
                Predicted using {result.model}
              </div>
              
              <div className="mt-8 w-full max-w-xs mx-auto">
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${result.survived ? 'bg-primary' : 'bg-destructive'}`}
                    style={{ width: `${result.probability * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-2xl text-muted-foreground mb-2">No Prediction Yet</div>
              <p className="text-muted-foreground">Enter passenger details and click "Predict Survival"</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
