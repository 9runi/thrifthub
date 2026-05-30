import denimSkirt from '../images/denim-skirt.jpg';
import acidWashJacket from '../images/acid-wash-jacket.jpg';
import buckleBag from '../images/buckle-bag.jpg';
import brownFloralDress from '../images/brown-floral-dress.png';
import flaredJeans from '../images/flared-jeans.jpg';
import pinkFloralDress from '../images/pink-floral-dress.jpg';
import classicDenimJacket from '../images/classic-denim-jacket.png';
import jordanSneakers from '../images/jordan-sneakers.jpg';
import largeSunglasses from '../images/large-sunglasses.jpg';
import juicyTee from '../images/juicy-couture-tee.jpg';
import guessSweater from '../images/guess-sweater.jpg';
import brownPlatformHeels from '../images/brown-platform-heels.jpg';
import pinkKnitSweater from '../images/pink-knit-sweater.jpg';
import fuzzyStripedSweater from '../images/fuzzy-striped-sweater.jpg';
import cableKnitSweater from '../images/cable-knit-sweater.jpg';
import tartanHeels from '../images/tartan-heels.jpg';
import whiteRuchedBlouse from '../images/white-ruched-blouse.jpg';
import denimSkirtAlt from '../images/denim-skirt-alt.jpg';

export const sellers = [
  {
    id: 'retro-finds',
    username: 'retro_finds',
    name: 'Maya Haddad',
    location: 'Beirut, Lebanon',
    rating: 4.9,
    joined: '2024',
    bio: 'Curates denim, Y2K jackets, and clean vintage pieces for everyday outfits.'
  },
  {
    id: 'rose-archive',
    username: 'rose_archive',
    name: 'Lina Karim',
    location: 'Tripoli, Lebanon',
    rating: 4.8,
    joined: '2025',
    bio: 'Loves floral dresses, soft colors, and romantic second-hand fashion.'
  },
  {
    id: 'street-vault',
    username: 'street_vault',
    name: 'Omar Saleh',
    location: 'Saida, Lebanon',
    rating: 4.7,
    joined: '2023',
    bio: 'Finds sneakers, sunglasses, and streetwear items with strong Y2K energy.'
  },
  {
    id: 'closet-gems',
    username: 'closet_gems',
    name: 'Nour Farah',
    location: 'Jounieh, Lebanon',
    rating: 4.9,
    joined: '2024',
    bio: 'Posts affordable cute tops, knitwear, bags, and statement accessories.'
  }
];

export const products = [
  {
    id: 'denim-skirt',
    title: 'Dark Denim Mini Skirt',
    price: 18,
    category: 'Skirts',
    brand: 'Y2K Denim',
    condition: 'Good',
    size: 'S',
    sellerId: 'closet-gems',
    image: denimSkirt,
    description: 'Dark denim mini skirt with side buttons and a clean Y2K shape.',
    tags: ['denim', 'skirt', 'y2k', 'mini']
  },
  {
    id: 'acid-wash-jacket',
    title: 'Acid Wash Denim Jacket',
    price: 45,
    category: 'Jackets',
    brand: 'Denim Studio',
    condition: 'Like New',
    size: 'M',
    sellerId: 'retro-finds',
    image: acidWashJacket,
    description: 'Fitted acid wash denim jacket with zipper front, shaped seams, and vintage attitude.',
    tags: ['denim', 'jacket', 'acid wash', 'outerwear']
  },
  {
    id: 'buckle-bag',
    title: 'Black Buckle Shoulder Bag',
    price: 32,
    category: 'Bags',
    brand: 'Urban Luxe',
    condition: 'Very Good',
    size: 'One Size',
    sellerId: 'closet-gems',
    image: buckleBag,
    description: 'Black shoulder bag with buckle details and soft gathered shape.',
    tags: ['bag', 'black', 'buckle', 'accessory']
  },
  {
    id: 'brown-floral-dress',
    title: 'Vintage Brown Floral Dress',
    price: 40,
    category: 'Dresses',
    brand: 'Cottage Archive',
    condition: 'Very Good',
    size: 'M',
    sellerId: 'rose-archive',
    image: brownFloralDress,
    description: 'Warm floral dress with a classic vintage cut and soft gathered waist.',
    tags: ['dress', 'floral', 'vintage', 'cottage']
  },
  {
    id: 'flared-jeans',
    title: 'Low Rise Flared Jeans',
    price: 28,
    category: 'Jeans',
    brand: 'Miss Sixty Style',
    condition: 'Good',
    size: 'S',
    sellerId: 'retro-finds',
    image: flaredJeans,
    description: 'Low-rise blue flared jeans with a long Y2K silhouette.',
    tags: ['jeans', 'flared', 'denim', 'low rise']
  },
  {
    id: 'pink-floral-dress',
    title: 'Pink Rose Summer Dress',
    price: 35,
    category: 'Dresses',
    brand: 'Rose Label',
    condition: 'Like New',
    size: 'S',
    sellerId: 'rose-archive',
    image: pinkFloralDress,
    description: 'Pink floral dress with thin straps and a soft summer look.',
    tags: ['pink', 'floral', 'dress', 'summer']
  },
  {
    id: 'classic-denim-jacket',
    title: 'Classic Denim Trucker Jacket',
    price: 50,
    category: 'Jackets',
    brand: 'Levi Style',
    condition: 'Good',
    size: 'L',
    sellerId: 'retro-finds',
    image: classicDenimJacket,
    description: 'Classic blue denim jacket with button front and relaxed fit.',
    tags: ['denim', 'jacket', 'classic', 'trucker']
  },
  {
    id: 'jordan-sneakers',
    title: 'White Navy High Sneakers',
    price: 85,
    category: 'Shoes',
    brand: 'Jordan Style',
    condition: 'Good',
    size: '39',
    sellerId: 'street-vault',
    image: jordanSneakers,
    description: 'White and navy high sneakers with a clean sporty look.',
    tags: ['sneakers', 'shoes', 'white', 'navy']
  },
  {
    id: 'large-sunglasses',
    title: 'Large Black Sunglasses',
    price: 15,
    category: 'Accessories',
    brand: 'Rampage',
    condition: 'Very Good',
    size: 'One Size',
    sellerId: 'street-vault',
    image: largeSunglasses,
    description: 'Oversized black sunglasses with dark lenses and a glossy frame.',
    tags: ['sunglasses', 'black', 'accessory', 'glam']
  },
  {
    id: 'juicy-couture-tee',
    title: 'White Logo Baby Tee',
    price: 22,
    category: 'Tops',
    brand: 'Juicy Couture',
    condition: 'Good',
    size: 'S',
    sellerId: 'closet-gems',
    image: juicyTee,
    description: 'White fitted baby tee with bold logo print and Y2K style.',
    tags: ['tee', 'top', 'juicy', 'white']
  },
  {
    id: 'guess-sweater',
    title: 'Striped Guess Knit Sweater',
    price: 30,
    category: 'Sweaters',
    brand: 'Guess',
    condition: 'Very Good',
    size: 'S',
    sellerId: 'closet-gems',
    image: guessSweater,
    description: 'Gray and black striped knit sweater with rhinestone logo detail.',
    tags: ['sweater', 'guess', 'striped', 'knit']
  },
  {
    id: 'brown-platform-heels',
    title: 'Brown Platform Mule Heels',
    price: 38,
    category: 'Shoes',
    brand: 'Retro Heels',
    condition: 'Very Good',
    size: '38',
    sellerId: 'street-vault',
    image: brownPlatformHeels,
    description: 'Brown platform heels with buckle strap and strong vintage shape.',
    tags: ['heels', 'platform', 'brown', 'shoes']
  },
  {
    id: 'pink-knit-sweater',
    title: 'Pink Off Shoulder Knit Sweater',
    price: 34,
    category: 'Sweaters',
    brand: 'Soft Knit',
    condition: 'Like New',
    size: 'S',
    sellerId: 'rose-archive',
    image: pinkKnitSweater,
    description: 'Soft pink cable knit sweater with off-shoulder neckline and side buttons.',
    tags: ['pink', 'sweater', 'knit', 'soft']
  },
  {
    id: 'fuzzy-striped-sweater',
    title: 'Fuzzy Purple Striped Sweater',
    price: 36,
    category: 'Sweaters',
    brand: 'Cozy Archive',
    condition: 'Good',
    size: 'M',
    sellerId: 'rose-archive',
    image: fuzzyStripedSweater,
    description: 'Fuzzy purple striped sweater with long sleeves and soft texture.',
    tags: ['purple', 'fuzzy', 'sweater', 'striped']
  },
  {
    id: 'cable-knit-sweater',
    title: 'Cream Cable Knit Sweater',
    price: 42,
    category: 'Sweaters',
    brand: 'Heritage Knit',
    condition: 'Very Good',
    size: 'M',
    sellerId: 'retro-finds',
    image: cableKnitSweater,
    description: 'Cream cable knit V-neck sweater with a clean cozy look.',
    tags: ['cream', 'cable knit', 'sweater', 'cozy']
  },
  {
    id: 'tartan-heels',
    title: 'Pink Tartan Buckle Heels',
    price: 27,
    category: 'Shoes',
    brand: 'Y2K Heel Club',
    condition: 'Good',
    size: '38',
    sellerId: 'street-vault',
    image: tartanHeels,
    description: 'Pink tartan open-toe heels with buckle strap and playful Y2K pattern.',
    tags: ['heels', 'pink', 'tartan', 'buckle']
  },
  {
    id: 'white-ruched-blouse',
    title: 'White Ruched Button Blouse',
    price: 24,
    category: 'Tops',
    brand: 'Minimal Chic',
    condition: 'Very Good',
    size: 'M',
    sellerId: 'closet-gems',
    image: whiteRuchedBlouse,
    description: 'White button blouse with ruching detail and fitted waist.',
    tags: ['blouse', 'white', 'top', 'ruched']
  },
  {
    id: 'denim-skirt-alt',
    title: 'Button Detail Denim Skirt',
    price: 20,
    category: 'Skirts',
    brand: 'Vintage Denim',
    condition: 'Good',
    size: 'S',
    sellerId: 'retro-finds',
    image: denimSkirtAlt,
    description: 'Dark denim mini skirt with layered waist detail and side buttons.',
    tags: ['denim', 'skirt', 'buttons', 'vintage']
  }
];
