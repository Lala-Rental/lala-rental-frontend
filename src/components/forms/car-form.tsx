import React, { useEffect, useState } from 'react';
import AuthButton from '../buttons/auth-button.tsx';
import Stepper from '../stepper/stepper.tsx';

// Steps
import StepOne from './cars/step-one.tsx';
import StepTwo from './cars/step-two.tsx';
import StepThree from './cars/step-three.tsx';
import StepFour from './cars/step-four.tsx';
import StepFive from './cars/step-five.tsx';
import api from '../../services/api.ts';
import AlertMessage from '../alerts/alert-message.tsx';
import { useAuth } from '../../contexts/AuthContext.tsx';
import AuthModal from '../auth/auth-modal.tsx';
import SellerModal from './seller-form.tsx';

interface Car {
    title: string;
    car_model: string;
    year: number;
    description: string;
    category: string;
    location: string;
    make: string;
    mileage: number;
    price: number;
    condition: string;
    transmission: string;
    fuel_type: string;
    status: string;
    images: File[],
    new_images?: File[];
    features: string[];
    seats: number;
    autonomy: string;
    color: string;
};

interface CarFormProps {
    onCallback: (car: Car) => void;
    onFallback?: (car: Car, id: string) => void;
    isEditing: boolean;
    initialData?: any;
}

interface Seller {
    fullname?: string; 
    email?: string; 
    phone?: string
}

const CarForm: React.FC<CarFormProps> = ({ onCallback, onFallback, isEditing, initialData, }) => {
    const [title, setTitle] = useState('');
    const [car_model, setCarModel] = useState('');
    const [year, setYear] = useState<number | ''>(2024);
    const [color, setColor] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [make, setMake] = useState('');
    const [mileage, setMileage] = useState<number | ''>(0);
    const [price, setPrice] = useState<number | ''>(0);
    const [autonomy, setAutonomy] = useState('N/A');
    const [condition, setCondition] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuel_type, setFuelType] = useState('');
    const [seats, setSeats] = useState(0);
    const [status, setStatus] = useState('available');
    const [images, setImages] = useState<File[]>([]);
    const [features, setFeatures] = useState<string[]>([]);

    const [currentStep, setCurrentStep] = useState(0);
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isLoading, setIsloading] = useState(false);
    const [carDetails, setCarDetails] = useState<Car | null>(null);
    const [seller, setSeller] = useState<Seller>({});
    
    const [sellerModal, setSellerModal] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    
    const openSellerModal = () => setSellerModal(true);
    const openAuthModal = () => setAuthModal(true);

    const closeSellerModal = () => setSellerModal(false);
    const closeAuthModal = () => setAuthModal(false);

    const { token, isAuthenticated, user } = useAuth();

    /**
     * When All input filled and let apply validation and submit
     * 
     * @param e 
     * @returns 
     */
    const handleCarInformation = (e: React.FormEvent) => {
        e.preventDefault();

        const missing: string[] = [];
        
        if (!title) missing.push('title');
        if (!car_model) missing.push('model');
        if (!year) missing.push('year');
        if (!category) missing.push('type');
        if (!location) missing.push('location');
        if (!make) missing.push('make');
        if (!price) missing.push('price');
        if (!condition) missing.push('condition');
        if (!transmission) missing.push('transmission');
        if (!fuel_type) missing.push('fuel_type');
        if (images.length === 0) missing.push('images');
        if (features.length === 0) missing.push('features');
        if (seats <= 0) missing.push('seats');
        if (!color) missing.push('color');

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("There are missing fields. Please fill all fields");
            setAlertType('error');
            return;
        }

        const payload = { title, car_model, year: Number(year), description, category, location, make, mileage: Number(mileage), price: Number(price), condition, transmission, fuel_type, images, status, features, seats, autonomy, color };

        if (isEditing) {
            setCarDetails(payload);
            openSellerModal();
        } else {
            setCarDetails(payload);
            openSellerModal();
        }
    };

    /**
     * Handle Seller Information
     * 
     * @param sellerInfo 
     */
    const handleSellerInformation = (sellerInfo: any) => {
        setSeller(sellerInfo);
        closeSellerModal();
        openAuthModal();
    }

    /**
     * handle auth and submit car 
     * 
     * @param response
     */
    const handleAuthenticatedUser = (response: any) => {
        return isEditing ? handleUpdateCar : handleSubmitCar();
    }

    /**
     * Submit Car
     * 
     * @param car 
     */
    const handleSubmitCar = () => {        
        const missing: string[] = [];

        if (!carDetails) {
            setAlertMessage('Car details are missing.');
            setAlertType('error');
            return;
        }
        
        if (!seller.fullname) missing.push('fullname');
        if (!seller.email) missing.push('email');
        if (!seller.phone) missing.push('phonenumber');

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("Seller Information must be filled");
            setAlertType('error');
            return;
        }

        try {
            setIsloading(true);

            const formData = new FormData();
            
            if (isAuthenticated && user) formData.append('user', user.id);
            
            formData.append('title', carDetails.title);
            formData.append('car_model', carDetails.car_model);
            formData.append('year', carDetails.year.toString());
            formData.append('description', carDetails.description);
            formData.append('category', carDetails.category);
            formData.append('location', carDetails.location);
            formData.append('make', carDetails.make);
            formData.append('mileage', carDetails.mileage.toString());
            formData.append('price', carDetails.price.toString());
            formData.append('condition', carDetails.condition);
            formData.append('transmission', carDetails.transmission);
            formData.append('fuel_type', carDetails.fuel_type);
            formData.append('status', carDetails.status);
            formData.append('seats', carDetails.seats.toString());
            formData.append('autonomy', carDetails.autonomy);
            formData.append('color', carDetails.color);
            formData.append('features', JSON.stringify(carDetails.features));
            formData.append('seller', JSON.stringify(seller));

            // Append images array
            if (carDetails.images && carDetails.images.length > 0) {
                carDetails.images.forEach((image: File) => {
                    formData.append("images", image);
                });
            }

            api.post('/cars', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }).then((response: any) => {
                closeSellerModal();
                resetForm();

                setAlertMessage('Your car has been successfully posted! It will be reviewed and approved shortly before appearing on the website.');
                setAlertType('success');
                setIsloading(false);   
                
                onCallback(response);
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsloading(false);
            })
        } catch (error) {
            setAlertMessage('An error occurred. Please try again.');
            setAlertType('error');
            setIsloading(false);
        }
    };

     /**
     * Update Car
     * 
     * @param car 
     */
    const handleUpdateCar = () => {
        const missing: string[] = [];

        if (!carDetails) {
            setAlertMessage('Car details are missing.');
            setAlertType('error');
            return;
        }
        
        if (!seller.fullname) missing.push('fullname');
        if (!seller.email) missing.push('email');
        if (!seller.phone) missing.push('phonenumber');

        if (missing.length > 0) {
            setMissingFields(missing);
            setAlertMessage("Seller Information must be filled");
            setAlertType('error');
            return;
        }

        try {
            setIsloading(true);

            const formData = new FormData();
            
            formData.append('user', user.id);
            formData.append('title', carDetails.title);
            formData.append('car_model', carDetails.car_model);
            formData.append('year', carDetails.year.toString());
            formData.append('description', carDetails.description);
            formData.append('category', carDetails.category);
            formData.append('location', carDetails.location);
            formData.append('make', carDetails.make);
            formData.append('mileage', carDetails.mileage.toString());
            formData.append('price', carDetails.price.toString());
            formData.append('condition', carDetails.condition);
            formData.append('transmission', carDetails.transmission);
            formData.append('fuel_type', carDetails.fuel_type);
            formData.append('status', carDetails.status);
            formData.append('seats', carDetails.seats.toString());
            formData.append('autonomy', carDetails.autonomy);
            formData.append('color', carDetails.color);
            formData.append('features', JSON.stringify(carDetails.features));
            formData.append('seller', JSON.stringify(seller));

            if (carDetails.images && carDetails.images.length > 0) {
                carDetails.images.forEach((image: File) => {
                    formData.append("images", image);
                });
            }

            api.post(`/cars/update/${initialData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            }).then((response: any) => {
                setAlertMessage('Car Updated Successfully.');
                setAlertType('success');
                setIsloading(false);  
            }).catch((error: { response: { data: { message: string; }; }; }) => {
                setAlertMessage('An error occurred. '+error.response.data.message);
                setAlertType('error');
                setIsloading(false);  
            })
        } catch (error) {
            setAlertMessage('An error occurred. Please try again.');
            setAlertType('error');
            setIsloading(false);  
        }
    }

    /**
     * Reset Car form
     */
    const resetForm = () => {
        setTitle('');
        setCarModel('');
        setYear('');
        setDescription('');
        setCategory('');
        setLocation('');
        setMake('');
        setMileage('');
        setPrice('');
        setCondition('');
        setTransmission('');
        setFuelType('');
        setImages([]);
        setStatus('');
        setFeatures([]);
        setSeats(0);
        setAutonomy('');
        setColor('');
    };

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const getErrorField = (field: string) => {
        return missingFields.includes(field) ? `${field} is required` : '';
    };

    // Steps
    const steps = [
        <StepOne key="step1" getErrorField={getErrorField} name={title} setName={setTitle} model={car_model} setModel={setCarModel} year={year === '' ? 2024 : year} setYear={(value) => setYear(value)} color={color} setColor={setColor} />,
        <StepTwo key="step2" getErrorField={getErrorField} category={category} description={description} location={location} status={status} setCategory={setCategory} setDescription={setDescription} setLocation={setLocation} setStatus={setStatus} inEditMode={initialData ? true : false} />,
        <StepThree key="step3" getErrorField={getErrorField} make={make} setMake={setMake} mileage={mileage === '' ? 0 : mileage} setMileage={setMileage} price={price === '' ? 0 : price} setPrice={setPrice} autonomy={autonomy} setAutonomy={setAutonomy} />,
        <StepFour key="step4" getErrorField={getErrorField} condition={condition} setCondition={setCondition} transmission={transmission} setTransmission={setTransmission} fuelType={fuel_type} setFuelType={setFuelType} seats={seats} setSeats={setSeats} />,
        <StepFive key="step5" getErrorField={getErrorField} images={images} setImages={setImages} currentImages={initialData ? (initialData.images ?? []) : []} features={features} setFeatures={setFeatures} />,
    ];

    useEffect(() => {
        if (isAuthenticated && user) {
            setSeller({
                fullname: user.name,
                email: user.email,
                phone: user.phone
            });
        }

        if (initialData) {
            setTitle(initialData.title);
            setCarModel(initialData.car_model);
            setYear(initialData.year);
            setColor(initialData.color);

            setDescription(initialData.description);
            setCategory(initialData.category);
            setLocation(initialData.location);

            setMake(initialData.make);
            setMileage(initialData.mileage);
            setPrice(initialData.price);
            setAutonomy(initialData.autonomy);

            setCondition(initialData.condition);
            setTransmission(initialData.transmission);
            setFuelType(initialData.fuel_type);
            setStatus(initialData.status || '');
            setSeats(initialData.seats);
            setFeatures(initialData.features);
        }
    }, [initialData, isAuthenticated, user]);

    return (
        <div>
            {/* Car form */}
            <form onSubmit={handleCarInformation}>
                <Stepper steps={steps} currentStep={currentStep} onNext={handleNext} onPrevious={handlePrevious}/>

                {currentStep === steps.length - 1 && (
                    <div className="flex items-center justify-between mt-4">
                        <AuthButton text={initialData ? 'Save Changes' : 'Submit'} isLoading={isLoading} type="submit" className="mt-5" />
                    </div>
                )}
            </form>

            {/* Seller Form */}
            <SellerModal isOpen={sellerModal} onClose={closeSellerModal} callback={handleSellerInformation} getErrorField={getErrorField} />

            {/* Auth Form */}
            <AuthModal isOpen={authModal} onClose={closeAuthModal} callback={handleAuthenticatedUser} fallback={() => {}} />

            {/* Alert Message */}
            <AlertMessage message={alertMessage} type={alertType} />
        </div>
    );
};

export default CarForm;