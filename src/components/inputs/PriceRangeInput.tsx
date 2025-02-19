import React from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

interface PriceRangeInputProps {
    price: number[];
    setPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

const PriceRangeInput: React.FC<PriceRangeInputProps> = ({ price, setPrice }) => {
    /**
     * Handle input change
     * 
     * @param value 
     */
    const inputChanged = (value: number[]) => {
        setPrice(value);
    }

    return (
        <div className="flex flex-col w-full">
            <style>{`
                .range-slider {
                    position: relative;
                }
                .range-slider input {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    top: -5px;
                    background: none;
                    pointer-events: none;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                }
                .range-slider__range {
                    background: #e2e8f0;
                }
                .range-slider__range[data-active] {
                    background: #cbd5e0;
                }
                .range-slider__thumb {
                    height: 17px;
                    width: 17px;
                    border-radius: 50%;
                    background: #17a2b8;
                    pointer-events: auto;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
                }
                .range-slider__thumb[data-lower] {
                    background: #03783d;
                }
                .range-slider__thumb[data-upper] {
                    background: #03783d;
                }
                .range-slider__thumb[data-active] {
                    background: #0d6efd;
                }
                .range-slider__thumb[data-disabled] {
                    background: #6c757d;
                }
            `}</style>

            <div className="text-sm font-semibold text-gray-600 mb-2">
                From: <span className="ml-4 text-sm font-bold text-slate-700">{`${new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(price[0]))}`}</span> <br />
                To: <span className="ml-4 text-sm font-bold text-slate-700">{`${new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(Number(price[1]))}`}</span>
            </div>
            
            <div className="w-full my-4">
                <RangeSlider 
                    min={1000000} 
                    max={200000000} 
                    value={price}
                    onInput={inputChanged} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" 
                />
            </div>
        </div>
    );
};

export default PriceRangeInput;