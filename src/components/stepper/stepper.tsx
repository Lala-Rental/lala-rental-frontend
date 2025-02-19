import React from 'react';

interface StepperProps {
    steps: React.ReactNode[];
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, onNext, onPrevious }) => {
    return (
        <div>
            <div className="mb-4">
                {steps[currentStep]}
            </div>
            
            <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
            
            <div className="flex justify-between mt-5">
                {currentStep > 0 && (
                    <button
                        type="button"
                        onClick={onPrevious}
                        disabled={currentStep === 0}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline flex items-center">
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M9.57 5.93L3.5 12l6.07 6.07M20.5 12H3.67"></path></svg></span>
                        <span className='ml-2'>Previous</span>
                    </button>
                )}

                {currentStep < steps.length - 1 && (
                    <button
                        type="button"
                        onClick={onNext}
                        disabled={currentStep === steps.length - 1}
                        className="bg-primary hover:bg-primary flex items-center text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        <span className='mr-2'>Continue</span>
                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.5" d="M14.43 5.93L20.5 12l-6.07 6.07M3.5 12h16.83"></path></svg></span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Stepper;