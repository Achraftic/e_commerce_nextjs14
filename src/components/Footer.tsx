import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";

export function Footer() {
    return (
        <footer className=" text-zinc-700 py-8 mt-10 ">
            <div className="container mx-auto px-4 md:px-8 grid  grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-zinc-50">Company</h3>
                    <p className="text-sm text-zinc-400">
                        &copy; {new Date().getFullYear()} YourEcommerceSite
                    </p>
                    <p className="text-sm text-zinc-400 mt-2">
                        We provide the best products with excellent customer service. Stay connected with us!
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-zinc-50">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="text-sm text-zinc-400 hover:underline">About Us</a></li>
                        <li><a href="/shop" className="text-sm text-zinc-400 hover:underline">Shop</a></li>
                        <li><a href="/contact" className="text-sm text-zinc-400 hover:underline">Contact</a></li>
                        <li><a href="/faq" className="text-sm text-zinc-400 hover:underline">FAQ</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-zinc-50">Follow Us</h3>
                    <div className="flex items-center space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-600">
                            <CiFacebook size={24} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-600">
                            <CiInstagram size={24} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-600">
                            <CiTwitter size={24} />
                        </a>
                    </div>
                </div>
            </div>

         
        </footer>

    )
}