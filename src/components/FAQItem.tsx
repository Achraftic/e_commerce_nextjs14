import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { RiChatSmile3Line } from "react-icons/ri";

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
    return (
        <Collapsible className="w-full max-w-xl">
            <CollapsibleTrigger className="w-full p-4 flex  items-center gap-2  text-left font-semibold text-zinc-800 dark:text-zinc-50  transition rounded-lg  focus:outline-none">
                <div className="border border-zinc-300/85 text-zinc-800 dark:text-zinc-50 rounded-lg w-max p-1.5">
                    <RiChatSmile3Line size={20} />
                </div>
                <div>
                    {question}
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 ml-10 text-zinc-700 dark:text-zinc-200  border-t border-zinc-200  dark:border-zinc-700 transition">
                {answer}
            </CollapsibleContent>
        </Collapsible>
    );
}