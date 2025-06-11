import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Info } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false, compact = false }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  if (compact) {
    return (
      <div className="card group overflow-hidden">
        <Link to={`/products/${product.id}`} className="block">
          <div className="relative h-32 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-card-image transition-transform duration-300 group-hover:scale-105"
              style={{ 
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%'
              }}
            />
            {featured && (
              <span className="absolute top-1 right-1 badge bg-blue-500 text-white text-xs">
                Featured
              </span>
            )}
            {product.stock < 10 && (
              <span className="absolute top-1 left-1 badge bg-red-500 text-white text-xs">
                Low Stock
              </span>
            )}
          </div>
          <div className="p-2">
            <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{product.name}</h3>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-900 text-sm">KES {product.price}</span>
              <button
                onClick={handleAddToCart}
                className="p-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div 
      className={`card group overflow-hidden ${
        featured ? 'border-2 border-blue-100' : ''
      }`}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-card-image transition-transform duration-300 group-hover:scale-105"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%'
            }}
          />
          {featured && (
            <span className="absolute top-2 right-2 badge bg-blue-500 text-white">
              Featured
            </span>
          )}
          {product.stock < 10 && (
            <span className="absolute top-2 left-2 badge bg-red-500 text-white">
              Low Stock
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-gray-900">KES {product.price}</span>
            <div className="flex space-x-2">
              <Link
                to={`/products/${product.id}`}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
              >
                <Info size={18} />
              </Link>
              <button
                onClick={handleAddToCart}
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;