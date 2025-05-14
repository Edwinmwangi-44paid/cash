import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  isNew?: boolean;
}

interface ProductCarouselProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

const ProductCarousel = ({
  products = [
    {
      id: "1",
      name: "Wireless Noise Cancelling Headphones",
      price: 299.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      discount: 15,
      isNew: true,
    },
    {
      id: "2",
      name: 'Ultra HD Smart TV 55"',
      price: 799.99,
      image:
        "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80",
    },
    {
      id: "3",
      name: "Professional DSLR Camera",
      price: 1299.99,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
      isNew: true,
    },
    {
      id: "4",
      name: "Smartphone Pro Max",
      price: 1099.99,
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=800&q=80",
      discount: 10,
    },
    {
      id: "5",
      name: "Wireless Gaming Mouse",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&q=80",
    },
  ],
  title = "Featured Products",
  subtitle = "Explore our top picks of the season",
}: ProductCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerView = 3;
  const maxIndex = Math.max(0, products.length - productsPerView);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(maxIndex, prevIndex + 1));
  };

  const visibleProducts = products.slice(
    currentIndex,
    currentIndex + productsPerView,
  );

  return (
    <div className="w-full py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className="flex space-x-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="overflow-hidden group transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-2">
                      {product.discount && (
                        <Badge variant="destructive" className="text-xs">
                          {product.discount}% OFF
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge variant="secondary" className="text-xs">
                          NEW
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        {product.discount ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">
                              $
                              {(
                                product.price *
                                (1 - product.discount / 100)
                              ).toFixed(2)}
                            </span>
                            <span className="text-muted-foreground text-sm line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          variant="secondary"
                          className="rounded-full"
                        >
                          <motion.div
                            animate={{ rotate: [0, 5, -5, 5, 0] }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="mr-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </motion.div>
                          Add
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-6">
          {Array.from({
            length: Math.ceil(products.length / productsPerView),
          }).map((_, index) => (
            <Button
              key={index}
              variant={
                currentIndex === index * productsPerView ? "default" : "ghost"
              }
              size="sm"
              className="w-8 h-8 p-0 rounded-full mx-1"
              onClick={() => setCurrentIndex(index * productsPerView)}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
