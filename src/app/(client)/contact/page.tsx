import FAQItem from '@/components/FAQItem';
import React from 'react';
import { RiChatSmile3Line, RiCustomerService2Line, RiMailLine, RiTeamLine } from 'react-icons/ri';

const cardData = [
    {
        icon: <RiChatSmile3Line size={20} />,
        title: 'Chat to sales',
        description: 'Speak to our support team.',
        email: 'sales@gmail.com',
    },
    {
        icon: <RiCustomerService2Line size={20} />,
        title: 'Customer support',
        description: 'We are here to help you 24/7.',
        email: 'support@gmail.com',
    },
    {
        icon: <RiMailLine size={20} />,
        title: 'Email us',
        description: 'Get in touch via email.',
        email: 'info@gmail.com',
    },
    {
        icon: <RiTeamLine size={20} />,
        title: 'Join our team',
        description: 'Become a part of our amazing team.',
        email: 'careers@gmail.com',
    },
];

export default function ContactPage() {
    return (
        <div className='my-10'>
            <div className='mb-20'>
                <h1 className="sm:text-4xl text-3xl font-semibold text-center">Contact our friendly team</h1>
                <p className="text-zinc-500 text-center text-base mt-4">We’re here to help. Reach out to us</p>
            </div>

            <div className="flex gap-4 lg:flex-nowrap flex-wrap max-sm:flex-col">
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className=" flex-1 transition-all hover:shadow-xl hover:shadow-zinc-200/70 border  hover:outline-primary outline outline-transparent shadow-sm border-primary/80 py-4 pl-4 pr-6 rounded-xl"
                    >
                        <div className="border border-zinc-300/85 text-zinc-800 rounded-lg w-max p-1.5">
                            {card.icon}
                        </div>

                        <div className="mt-10">
                            <h1 className="text-base font-bold">{card.title}</h1>
                            <p className="text-zinc-600 font-medium mt-1">{card.description}</p>
                            <p className="mt-4 mb-2 font-bold underline">{card.email}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-28 mb-16 px-4">
                <h1 className="sm:text-4xl text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h1>

                <div className="flex flex-col items-center  gap-2">
                    <FAQItem
                        question="Can I use this in my project?"
                        answer="Yes. Free to use for personal and commercial projects. No attribution required."
                    />
                    <FAQItem
                        question="Is there a license for this?"
                        answer="Yes, it’s licensed under the MIT license, so you have plenty of flexibility."
                    />
                    <FAQItem
                        question="What about support?"
                        answer="Our team is here to help you with any questions you may have. Feel free to reach out."
                    />
                    <FAQItem
                        question="How can I contribute?"
                        answer="You can contribute by submitting pull requests or opening issues in our GitHub repository."
                    />
                </div>
            </div>


        </div>
    );
}
