import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  onAddToCart?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard = ({
  id = "1",
  name = "Wireless Bluetooth Headphones",
  price = 129.99,
  originalPrice = 159.99,
  image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
  rating = 4.5,
  reviewCount = 128,
  isNew = false,
  isFeatured = false,
  onAddToCart = () => {},
  onQuickView = () => {},
}: ProductCardProps) => {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 120 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="relative pt-4 px-4">
          {isNew && (
            <Badge className="absolute top-6 left-6 z-10 bg-blue-500 hover:bg-blue-600">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge
              variant="destructive"
              className="absolute top-6 right-6 z-10"
            >
              {discount}% OFF
            </Badge>
          )}
          <div className="relative h-48 w-full overflow-hidden rounded-md bg-gray-100 group">
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Button
                    variant="secondary"
                    onClick={() => onQuickView(id)}
                    className="shadow-lg"
                  >
                    Quick View
                  </Button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-16 z-10"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-gray-100 hover:text-red-500"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>

        <CardContent className="flex flex-col flex-grow p-4">
          <div className="flex items-center mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
          </div>

          <h3 className="font-medium text-sm mb-1 line-clamp-2 flex-grow">
            {name}
          </h3>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">${price.toFixed(2)}</span>
              {originalPrice && originalPrice > price && (
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="sm"
                className="rounded-full"
                onClick={() => onAddToCart(id)}
              >
                <motion.div
                  animate={{ x: [0, -2, 2, -2, 0] }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mr-1"
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
  );
};

export default ProductCard;
