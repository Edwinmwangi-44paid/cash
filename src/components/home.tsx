import React, { useState } from "react";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import ProductCarousel from "./ProductCarousel";
import ProductGrid from "./ProductGrid";
import ShoppingCartComponent from "./ShoppingCart";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    {
      name: "Smartphones",
      image:
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
      slug: "smartphones",
    },
    {
      name: "Laptops",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80",
      slug: "laptops",
    },
    {
      name: "Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
      slug: "headphones",
    },
    {
      name: "Cameras",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80",
      slug: "cameras",
    },
    {
      name: "Smart Home",
      image:
        "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?w=400&q=80",
      slug: "smart-home",
    },
    {
      name: "Gaming",
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
      slug: "gaming",
    },
  ];

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold">ElectroShop</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:underline">
              Home
            </a>
            <a href="/products" className="text-sm font-medium hover:underline">
              All Products
            </a>
            <a href="/deals" className="text-sm font-medium hover:underline">
              Deals
            </a>
            <a href="/new" className="text-sm font-medium hover:underline">
              New Arrivals
            </a>
            <a href="/support" className="text-sm font-medium hover:underline">
              Support
            </a>
          </nav>

          {/* Search, User, Cart */}
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-[200px] lg:w-[300px] pl-8"
              />
            </div>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCart}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                3
              </span>
              <span className="sr-only">Shopping cart</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-background pt-16"
          >
            <div className="container px-4 py-6 flex flex-col gap-6">
              <div className="relative flex items-center">
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full pl-8"
                />
              </div>
              <nav className="flex flex-col gap-4">
                <a href="/" className="text-lg font-medium hover:underline">
                  Home
                </a>
                <a
                  href="/products"
                  className="text-lg font-medium hover:underline"
                >
                  All Products
                </a>
                <a
                  href="/deals"
                  className="text-lg font-medium hover:underline"
                >
                  Deals
                </a>
                <a href="/new" className="text-lg font-medium hover:underline">
                  New Arrivals
                </a>
                <a
                  href="/support"
                  className="text-lg font-medium hover:underline"
                >
                  Support
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container px-4 py-6 md:px-6 md:py-8"
      >
        {/* Hero Banner */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-[300px] md:h-[400px] flex items-center">
            <div className="container px-6 md:px-12">
              <div className="max-w-lg">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Summer Tech Sale
                </h1>
                <p className="text-lg md:text-xl text-white/90 mb-6">
                  Save up to 40% on the latest electronics and gadgets.
                </p>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-white/90"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Featured Products Carousel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Products
            </h2>
            <a
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <ProductCarousel />
        </motion.section>

        {/* Categories */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group relative rounded-lg overflow-hidden aspect-square bg-muted hover:opacity-90 transition-opacity"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                  <h3 className="text-white font-medium text-lg">
                    {category.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </motion.section>

        {/* Popular Products */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Products</h2>
            <a
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <ProductGrid />
        </motion.section>

        {/* Promotional Banner */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <div className="bg-muted rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-6 md:p-10 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  New Apple Watch Series 9
                </h2>
                <p className="text-muted-foreground mb-6">
                  Experience the next generation of health and fitness tracking
                  with the all-new Apple Watch Series 9.
                </p>
                <div>
                  <Button>Learn More</Button>
                </div>
              </div>
              <div className="aspect-video md:aspect-auto">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80"
                  alt="Apple Watch"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Trending Products */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            <a
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              View All
            </a>
          </div>
          <ProductGrid />
        </motion.section>
      </motion.main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ElectroShop</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your one-stop destination for the latest electronics and
                gadgets.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/products"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="/deals"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Deals
                  </a>
                </li>
                <li>
                  <a
                    href="/new"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    New Arrivals
                  </a>
                </li>
                <li>
                  <a
                    href="/bestsellers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Returns Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 ElectroShop. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/50"
              onClick={toggleCart}
            ></motion.div>
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="absolute top-0 right-0 h-full w-full max-w-md bg-background shadow-xl"
            >
              <ShoppingCartComponent onClose={toggleCart} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
