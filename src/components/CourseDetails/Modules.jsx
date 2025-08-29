import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Modules = () => {
    const modules = [
                {
            title: "SAP FICO",
            description: "SAP FICO, offered by IT Accurate Institute, encompasses financial accounting and controlling modules within the SAP ERP system, facilitating comprehensive financial management and reporting for organizations",
            cta: "Go to SAP FICO page",
            link: "/sap-fico",
            color: "from-green-500 to-green-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
                {
            title: "SAP MM",
            description: "SAP MM (Materials Management) is a module in SAP ERP that manages procurement processes and inventory management. IT Accurate Institute offers comprehensive training in SAP MM for effective utilization",
            cta: "Go to SAP MM page",
            link: "/sap-mm",
            color: "from-cyan-500 to-cyan-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
                {
            title: "SAP ABAP",
            description: "SAP ABAP is a programming language used for developing applications within the SAP ecosystem. IT Accurate Institute is a training center specializing in SAP courses, including ABAP programming to equip professionals with the skills.",
            cta: "Go to SAP ABAP page",
            link: "/sap-abap",
            color: "from-red-500 to-red-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80')]"
        },
                {
            title: "SAP SD",
            description: "SAP SD (Sales and Distribution) is a module in SAP ERP that manages sales and customer service processes. It covers order-to-cash processes, including sales order processing, pricing, delivery, and billing. SAP SD to equip individuals with skills.",
            cta: "Go to SAP SD page",
            link: "/sap-sd",
            color: "from-emerald-500 to-emerald-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },

        {
            title: "SAP HCM",
            description: "SAP HCM (Human Capital Management) is an integrated software suite by SAP that manages HR processes, from recruitment to payroll. IT Accurate Institute likely provides training in SAP HCM and related modules.",
            cta: "Go to SAP HCM page",
            link: "/sap-hcm",
            color: "from-yellow-500 to-yellow-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP SUCCESSFACTORS",
            description: "SAP SuccessFactors is a cloud-based Human Capital Management (HCM) solution for managing HR functions like recruitment, performance, learning, and employee engagement.",
            cta: "Go to SAP SUCCESSFACTORS page",
            link: "/sap-successfactors",
            color: "from-pink-500 to-pink-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
                {
            title: "SAP",
            description: "IT Accurate Training offers expert SAP training, empowering you to efficiently manage SAP systems and ensure seamless operations.",
            cta: "Go to SAP page",
            link: "/best-sap-training",
            color: "from-blue-500 to-blue-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },

        {
            title: "SAP SCM",
            description: "SAP SCM (Supply Chain Management) is a software suite by SAP that integrates and optimizes key supply chain processes for enhanced efficiency. It enables businesses to manage procurement, production, and distribution seamlessly, ensuring streamlined operations.",
            cta: "Go to SAP SCM page",
            link: "/sap-scm",
            color: "from-orange-500 to-orange-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP ARIBA",
            description: "SAP Ariba is a cloud-based procurement platform by SAP that streamlines and automates procurement processes, enhancing collaboration between buyers and suppliers. IT Accurate Institute is an educational institution specializing in SAP training and certification.",
            cta: "Go to SAP ARIBA page",
            link: "/sap-ariba",
            color: "from-teal-500 to-teal-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP PP",
            description: "SAP PP (Production Planning) is an SAP module that helps organizations manage and optimize their manufacturing processes, from planning and scheduling to execution. It integrates various business functions to streamline production.",
            cta: "Go to SAP PP page",
            link: "/sap-pp",
            color: "from-lime-500 to-lime-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },

        {
            title: "SAP FIORI",
            description: "SAP Fiori is a user experience (UX) design approach and set of design principles that enhance the usability and functionality of SAP applications. It provides a modern, responsive, and personalized user interface for a seamless and intuitive user experience in the SAP environment.",
            cta: "Go to SAP FIORI page",
            link: "/sap-fiori",
            color: "from-amber-500 to-amber-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP QM",
            description: "SAP QM (Quality Management) is a module in SAP ERP that facilitates quality control and assurance processes in manufacturing and production. It helps organizations manage quality planning, inspection, and certification, ensuring products meet specified standards and many more.",
            cta: "Go to SAP QM page",
            link: "/sap-qm",
            color: "from-rose-500 to-rose-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP PM",
            description: "SAP PM (Plant Maintenance) is a module in SAP ERP that helps organizations effectively manage and maintain their assets, equipment, and facilities. It covers processes such as preventive maintenance, work orders, and equipment tracking to optimize asset performance.",
            cta: "Go to SAP PM page",
            link: "/sap-pm",
            color: "from-violet-500 to-violet-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP WM & EWM",
            description: "SAP WM (Warehouse Management) focuses on efficient inventory management within a warehouse, while SAP EWM (Extended Warehouse Management) extends these capabilities with advanced features like labour management and slotting optimization for operations.",
            cta: "Go to SAP WM & EWM page",
            link: "/sap-wm-ewm",
            color: "from-fuchsia-500 to-fuchsia-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
        {
            title: "SAP LE & SL",
            description: "SAP LE (Logistics Execution) is a module that manages and optimizes warehouse and transportation processes, while SAP SL (Slotting) focuses on optimizing storage space and picking efficiency within a warehouse. Both modules contribute to streamlining supply chain operations in SAP systems.",
            cta: "Go to SAP LE & SL page",
            link: "/sap-le-sl",
            color: "from-sky-500 to-sky-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
                {
            title: "SAP BASIS",
            description: "IT Accurate Training offers expert SAP BASIS training, empowering you to efficiently manage SAP systems and ensure seamless operations.",
            cta: "Go to SAP BASIS page",
            link: "/sap-basis-training-in-nagpur",
            color: "from-purple-500 to-purple-700",
            bgImage: "bg-[url('https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')]"
        },
    ];

    return (
        <section className="py-16 dark:bg-gray-700 bg-zinc-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 dark:text-indigo-600 text-blue-600">
                        SAP <span className='text-slate-800 dark:text-white'>Modules</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {modules.map((course, index) => (
                        <div className='rounded-xl' key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{
                                    y: -10,
                                    rotateX: 5,
                                    rotateY: 5,
                                    transition: {
                                        damping: 10
                                    }
                                }}
                                className="relative rounded-xl overflow-hidden shadow-lg dark:shadow-gray-800/50 hover:shadow-xl transition-all duration-300 group h-full"
                                style={{ boxShadow: `0 15px 30px -5px rgba(168, 85, 247, 0.3)` }}
                            >
                                {/* Gradient border */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${course.color} p-0.5 rounded-xl`}></div>

                                {/* Background image with overlay */}
                                <div className={`absolute inset-0 ${course.bgImage} bg-cover bg-center opacity-10 dark:opacity-20 group-hover:opacity-30 dark:group-hover:opacity-40 transition-opacity duration-300`}></div>

                                <div className="flex flex-col justify-between h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-[10px]">
                                    <h3 className="text-xl font-bold mb-3 dark:text-white text-gray-800">
                                        {course.title}
                                    </h3>
                                    <p className="dark:text-gray-300 text-gray-600 mb-6">
                                        {course.description}
                                    </p>
                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-end text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                                    >
                                        <Link to={`${course.link}`}>
                                            {course.cta}
                                        </Link>
                                        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* View all button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12"
                >
                </motion.div>
            </div>
        </section>
    );
};

export default Modules;