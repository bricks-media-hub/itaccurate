import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useSelector } from 'react-redux';
import hdfcLogo from "../../../public/BankLogos/hdfclogo.jpg"

const calculateEMI = (principal, rate, months) => {
    const monthlyRate = rate / (12 * 100);
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi.toFixed(2);
};

const FeesDetails = () => {
    const banklogos = [
        {
            banklogo: hdfcLogo
        },
        {
            banklogo: "./BankLogos/VISA.png"
        },
        {
            banklogo: "./BankLogos/master-card.jpg"
        },
        {
            banklogo: "./BankLogos/AMEX-Card.png"
        },
        {
            banklogo: "./BankLogos/AMEX.png"
        },
        {
            banklogo: "./BankLogos/SBI.webp"
        },
        {
            banklogo: "./BankLogos/AXISBANK.png"
        },
        {
            banklogo: "./BankLogos/BOB.png"
        },
    ]
    const [isOpen, setIsOpen] = useState(false);
    const courseData = useSelector(state => state.courseBankLogoData.courseBankData);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showEMI, setShowEMI] = useState(false);
    const [selectedEMI, setSelectedEMI] = useState('');

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
        setShowEMI(false);
        setSelectedEMI('');
    };

    // const course = courseData.find(c => c.id === selectedCourse);

    return (
        <div className="my-16 max-w-5xl mx-auto p-6 bg-slate-50 dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Select Course</h2>
                <img src={hdfcLogo} alt="HDFC Logo" className="w-44 mt-4 sm:mt-0" />
            </div>

            <div className="relative w-full group">
                <select
                    value={selectedCourse}
                    onChange={handleCourseChange}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                    className="w-full p-3 md:p-4 pr-12 appearance-none rounded-xl border-2 border-blue-400/30 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 
    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 shadow-sm dark:shadow-md 
    hover:border-blue-400/50 dark:hover:border-blue-400/50 cursor-pointer
    backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80"
                >

                    <option value="" disabled className="text-gray-500 dark:text-gray-400">
                        Select a Course
                    </option>
                    {courseData.map((course) => (
                        <option
                            key={course.id}
                            value={course.id}
                            className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                            {course.name}
                        </option>
                    ))}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <svg
                            className={`w-5 h-5 text-blue-500 dark:text-blue-400 
        transition-transform duration-300 ease-in-out transform 
        ${isOpen ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}`}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                                className={`${isOpen ? 'opacity-100' : 'opacity-80'} transition-opacity`}
                            />
                        </svg>
                        <div
                            className={`absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/10 
        ${isOpen ? 'bg-blue-500/20 dark:bg-blue-400/20 scale-100' : 'scale-0'} 
        transition-all duration-300`}
                        />
                    </div>
                </div>

            </div>



            {/* {course && (
                <div className="flex items-center justify-between mt-4">
                    <p className="text-lg text-white">Price: ₹{course.price}</p>
                    <button
                        onClick={() => setShowEMI(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                    >
                        Show EMI Plans
                    </button>
                </div>
            )} */}

            {showEMI && course && (
                <div className="mt-6">
                    <p className="text-lg font-semibold text-black mb-3">Select EMI Plan:</p>
                    <div className="flex flex-wrap gap-4">
                        {course.emis.map((emi, idx) => (
                            <label key={idx} className="text-black flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={emi.duration}
                                    checked={selectedEMI === emi.duration}
                                    onChange={(e) => setSelectedEMI(e.target.value)}
                                />
                                {emi.duration} months at {emi.interest}%
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {selectedEMI && course && (
                <div className="overflow-x-auto mt-6">
                    <table className="w-full table-auto text-left border border-gray-300 dark:border-gray-600">
                        <thead className="bg-blue-600">
                            <tr>
                                <th className="text-white p-3">Duration</th>
                                <th className="text-white p-3">Interest Rate (%)</th>
                                <th className="text-white p-3">Monthly Payment (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {course.emis.filter(emi => emi.duration === selectedEMI).map((emi, idx) => {
                                const monthly = calculateEMI(course.price, emi.interest, parseInt(emi.duration));
                                return (
                                    <tr key={idx} className="border-t border-gray-300 dark:border-gray-700">
                                        <td className="text-white p-3">{emi.duration}</td>
                                        <td className="text-white p-3">{emi.interest}</td>
                                        <td className="text-white p-3">{monthly}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <p className="text-center text-black dark:text-white mt-6 text-lg font-medium">We accept all payment modes and cards.</p>

            <Marquee direction="right" gradient={false} speed={100} className="mt-4">
                {banklogos.map((img, i) => (
                    <img key={i} src={img.banklogo} alt="Bank Logo" className="h-12 mx-8" />
                ))}
            </Marquee>
        </div>
    );
};

export default FeesDetails;
