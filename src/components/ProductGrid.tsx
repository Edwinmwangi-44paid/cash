import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCard from "./ProductCard";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  brand: string;
  category: string;
  inStock: boolean;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  showFilters?: boolean;
}

const ProductGrid = ({
  products = mockProducts,
  title = "All Products",
  showFilters = true,
}: ProductGridProps) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand))
      return false;

    // Rating filter
    if (selectedRating && product.rating < selectedRating) return false;

    // Search query
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Featured - no specific sort
    }
  });

  // Get unique brands for filter
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedBrands([]);
    setSelectedRating(null);
    setSearchQuery("");
  };

  const FilterSidebar = () => (
    <div className="w-full lg:w-64 bg-background p-4 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-xs"
        >
          Reset All
        </Button>
      </div>

      <Separator className="my-4" />

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Price Range</h4>
        <Slider
          defaultValue={[0, 2000]}
          max={2000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Brand Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Brand</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={selectedRating === rating}
                onCheckedChange={() =>
                  setSelectedRating(selectedRating === rating ? null : rating)
                }
              />
              <Label htmlFor={`rating-${rating}`} className="text-sm">
                {rating}+ Stars
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-background p-4 md:p-6" id="product-grid">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile filter button */}
              {showFilters && (
                <Button
                  variant="outline"
                  className="md:hidden flex items-center gap-2"
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                >
                  <SlidersHorizontal size={16} />
                  Filters
                  {mobileFiltersOpen ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Results count */}
          <p className="text-muted-foreground">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar - desktop */}
          {showFilters && (
            <div className="hidden md:block sticky top-20 h-fit">
              <FilterSidebar />
            </div>
          )}

          {/* Mobile filters - collapsible */}
          {showFilters && mobileFiltersOpen && (
            <div className="md:hidden mb-4">
              <FilterSidebar />
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    inStock={product.inStock}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-xl font-medium mb-2">No products found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for default props
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    rating: 4.5,
    brand: "SoundMaster",
    category: "Audio",
    inStock: true,
  },
  {
    id: "2",
    name: 'Ultra HD Smart TV 55"',
    price: 799.99,
    image:
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=500&q=80",
    rating: 4.2,
    brand: "VisionTech",
    category: "TVs",
    inStock: true,
  },
  {
    id: "3",
    name: "Professional DSLR Camera",
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    rating: 4.8,
    brand: "PhotoPro",
    category: "Cameras",
    inStock: true,
  },
  {
    id: "4",
    name: "Smartphone X Pro",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?w=500&q=80",
    rating: 4.6,
    brand: "TechGiant",
    category: "Phones",
    inStock: true,
  },
  {
    id: "5",
    name: "Wireless Earbuds",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&q=80",
    rating: 4.3,
    brand: "SoundMaster",
    category: "Audio",
    inStock: true,
  },
  {
    id: "6",
    name: "Gaming Laptop Pro",
    price: 1899.99,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    rating: 4.7,
    brand: "GameForce",
    category: "Computers",
    inStock: false,
  },
  {
    id: "7",
    name: "Smart Watch Series 5",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80",
    rating: 4.4,
    brand: "TechGiant",
    category: "Wearables",
    inStock: true,
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&q=80",
    rating: 4.1,
    brand: "SoundMaster",
    category: "Audio",
    inStock: true,
  },
];

export default ProductGrid;
