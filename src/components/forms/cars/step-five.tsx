/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import TextInput from '../../inputs/text-input.tsx';

interface StepFiveProps {
    images: File[];
    setImages: (images: File[]) => void;
    currentImages: string[];
    features: string[];
    setFeatures: (features: string[]) => void;
    getErrorField: (field: string) => string;
}

const StepFive: React.FC<StepFiveProps> = ({ images, setImages, currentImages, features, setFeatures, getErrorField }) => {
    const [featureInput, setFeatureInput] = useState('');

    /**
     * Handle image change
     * 
     * @param e 
     */
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files);
            setImages([...images, ...newImages]);
        }
    };

    /**
    * Handle remove image
    * 
    * @param index 
    */
    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    /**
     * Convert URL to File
     * 
     * @param url 
     * @param filename 
     * @param mimeType 
     * @returns 
     */
    const urlToFile = async (url: string, filename: string, mimeType: string): Promise<File> => {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        return new File([buffer], filename, { type: mimeType });
    };

    /**
     * Fetch current images
     * 
     * @returns void
     */
    const fetchImages = async () => {
        if (currentImages && currentImages.length > 0) {
            const currentImageFiles = await Promise.all(
                currentImages.map((image, index) => urlToFile(image, `currentImage${index}.jpg`, 'image/jpeg'))
            );
    
            setImages(currentImageFiles);
        }
    };

    useEffect(() => {
        fetchImages();
    }, [currentImages, setImages]);

    const handleFeatureAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && featureInput.trim() !== '') {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput('');
            e.preventDefault();
        }
    };

    const handleFeatureRemove = (feature: string) => {
        setFeatures(features.filter(f => f !== feature));
    };

    return (
        <div>
            <div className='mb-5'>
                <TextInput
                    label="Car Features"
                    placeholder="Eg: Airbags (press enter to add more)"
                    value={featureInput}
                    onChange={setFeatureInput}
                    onKeyDown={handleFeatureAdd}
                    errorMessage={getErrorField('features')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 7v10c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V7c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".4" d="M14.5 4.5v2c0 1.1.9 2 2 2h2M8 13h4M8 17h8" stroke="#697689" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                </TextInput>
                <div className="mt-4 overflow-auto border border-gray-200 p-2 rounded-lg max-h-32">
                    {(!features || features.length === 0) && <div className='flex items-center justify-center text-sm p-3'>
                        <span className='text-gray-500 font-bold'>No Features Added</span>
                    </div>}
                    {features && [...features].reverse().map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-100 py-2 px-3 rounded mb-2 text-sm">
                            <span className='capitalize'>{index + 1}. {feature}</span>
                            <button
                                type="button"
                                className="text-red-500"
                                onClick={() => handleFeatureRemove(feature)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="m8.5 4.97.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="m18.85 9.14-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path opacity=".34" d="M10.33 16.5h3.33M9.5 12.5h5" stroke="#697689" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <label className="text-base font-medium text-slate-700 capitalize">Car Images</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="block w-full py-2 px-3 mt-2 mb-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"/>
                
                <div className="max-h-60 overflow-auto border border-gray-200 p-2 rounded-lg">
                    {(!images || images.length === 0) && <div className='flex items-center justify-center text-sm p-3'>
                        <span className='text-gray-500 font-bold'>No Images Added</span>
                    </div>}
                    <div className='grid grid-cols-2 gap-4 '>
                        {images && images.map((image, index) => (
                            <div key={index} className="relative border border-gray-200 rounded-md">
                                <img src={URL.createObjectURL(image)} alt={`Car Image ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="m9.17 14.83 5.66-5.66M14.83 14.83 9.17 9.17M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepFive;