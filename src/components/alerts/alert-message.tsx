import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

interface AlertMessageProps {
    message: string;
    type?: 'success' | 'error';
    duration?: number;
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type = 'success', duration = 5000 }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    if (!visible) return null;

    return (
        <div className={`fixed text-center z-50 bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-lg transition-opacity duration-300 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button className="ml-4 text-lg font-bold" onClick={() => setVisible(false)}>×</button>
            </div>
        </div>
    );
};

AlertMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
    duration: PropTypes.number,
};

export default AlertMessage;