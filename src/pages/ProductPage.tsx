import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ShopifyProduct['node']['variants']['edges'][0]['node'] | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const loadProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await fetchProductByHandle(handle);
        setProduct(data);
        
        if (data?.variants?.edges?.[0]?.node) {
          const firstVariant = data.variants.edges[0].node;
          setSelectedVariant(firstVariant);
          
          const initialOptions: Record<string, string> = {};
          firstVariant.selectedOptions.forEach(opt => {
            initialOptions[opt.name] = opt.value;
          });
          setSelectedOptions(initialOptions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  useEffect(() => {
    if (!product) return;
    
    const variant = product.variants.edges.find(v => 
      v.node.selectedOptions.every(opt => selectedOptions[opt.name] === opt.value)
    );
    
    if (variant) {
      setSelectedVariant(variant.node);
    }
  }, [selectedOptions, product]);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem: CartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions,
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: product.title,
      position: "top-center",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-6 pt-32 text-center">
          <h1 className="font-display text-3xl mb-4">Product not found</h1>
          <Link to="/" className="text-accent hover:underline">
            Return to shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = product.images?.edges || [];
  const price = selectedVariant?.price || product.priceRange.minVariantPrice;

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Back link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to shop
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-sm overflow-hidden">
                {images[activeImage]?.node && (
                  <img
                    src={images[activeImage].node.url}
                    alt={images[activeImage].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`w-20 h-20 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                        activeImage === idx ? 'border-accent' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={img.node.url}
                        alt={img.node.altText || `${product.title} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Info */}
            <div className="lg:py-8">
              <h1 className="font-display text-3xl md:text-4xl font-semibold mb-4">
                {product.title}
              </h1>
              
              <p className="text-2xl font-display font-semibold text-accent mb-6">
                {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
              </p>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>
              
              {/* Options */}
              {product.options?.map(option => (
                option.values.length > 1 && (
                  <div key={option.name} className="mb-6">
                    <label className="block text-sm font-medium mb-3">
                      {option.name}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map(value => (
                        <button
                          key={value}
                          onClick={() => handleOptionChange(option.name, value)}
                          className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                            selectedOptions[option.name] === value
                              ? 'border-foreground bg-foreground text-background'
                              : 'border-border hover:border-foreground'
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              ))}
              
              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-border rounded-sm flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-border rounded-sm flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Add to cart */}
              <Button 
                onClick={handleAddToCart}
                size="lg"
                className="w-full h-14 text-sm font-medium"
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductPage;
