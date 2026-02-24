import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronDown, ChevronRight, Shield, Search, Eye as EyeIcon, Target, Fuel, Mountain, Train, FlaskConical, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  specifications: string;
  images: string[];
  published: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  products: Product[];
}

const iconMap: Record<string, any> = {
  Shield, Search, EyeIcon, Target, Fuel, Mountain, Train, FlaskConical, Package,
};

const defaultCategories: Category[] = [
  {
    id: "fire-control",
    name: "Fire Control Systems",
    icon: "Shield",
    products: [
      {
        id: "amfdc-mk2",
        name: "AMFDC MK-II",
        description: "A small hand-held wonder, developed indigenously by DIPL, which gives immediate calculations and data to MFC for firing mortar.",
        specifications: "Capacity to store Mortar positions MP Grid reference\nCapacity to store Target positions IM Grid reference\nPre-stored safe zones (2 points & 3 points)\nEnvironmental temperature using external temperature probe\nAmmunition: HE fire, ILL fire, HE Smoke\nAccuracy: 5 Meters in range, 5 minutes in angle",
        images: [],
        published: true,
      },
      {
        id: "amfdc-mk3",
        name: "AMFDC MK-III",
        description: "MK-III is an advance state of art Handheld Device built with more user-friendly features. Supports two modes of operation: Standard AMFDC & Plotter mode.",
        specifications: "Plotter mode for visualisation of fall of shots\nGPS interface for exact OWN location\nZoom-in to Target area\nStore 100 Nos. MP, IM Grid references\nHigh brightness sunlight readable LCD\nDimensions: 105 x 185 x 60mm\nBattery: 3.7V 5000mAh Li-Poly, 8+ Hrs\nShock/Vibration: MIL-STD-810F compliant",
        images: [],
        published: true,
      },
      {
        id: "teevra",
        name: "TEEVRA — FDC for CSWs",
        description: "Teevra calculates firing data accurately for MMG, AGL and AGS-30 during operations. Calculations are automatic, without manually referring to range tables.",
        specifications: "No need to refer range tables\nHuman errors eliminated\nIntegrated GPS for own location\nNo wastage of ammunition",
        images: [],
        published: true,
      },
    ],
  },
  {
    id: "inspection",
    name: "Inspection & Safety",
    icon: "Search",
    products: [
      {
        id: "gbinp-17",
        name: "GBInP-17 Universal",
        description: "Universally designed for inspecting barrels of Field Guns of various ID — 105mm, 120mm, 125mm, 130mm & 155mm.",
        specifications: "Integration of electronics, optic sensors and mechanical design\nDetects Cracks, Pits to prevent fatal accidents",
        images: [],
        published: true,
      },
      {
        id: "lcgb",
        name: "LCGB-HMRSV-21-XG",
        description: "Designed for inspecting Barrels of FGs with IGCP Industrial Grade Computing Platform.",
        specifications: "Compatible for 105mm–155mm & ATAGS\nReal-time images with Angular & Linear Data\nUser-selected snapshots and video recording\nAI & ML algo integration",
        images: [],
        published: true,
      },
    ],
  },
  {
    id: "surveillance",
    name: "Field Surveillance",
    icon: "EyeIcon",
    products: [
      {
        id: "fsd-flexible",
        name: "FSD Flexible / INVSS-16/19",
        description: "Used in CI ops of enemy hideouts & difficult to reach locations. Also used as NDT system for inspection of Gun Barrels.",
        specifications: "Display: 3.5/4.3\"\nResolution: 640 x 480\nOS: Real-time OS\nPower: 7.4V rechargeable\nProbe Ø: 9mm\nWorking length: 3M",
        images: [],
        published: true,
      },
    ],
  },
  {
    id: "simulators",
    name: "Simulators & Training",
    icon: "Target",
    products: [
      {
        id: "atgm-sv21",
        name: "ATGM (SV21) Simulator",
        description: "Indigenously developed ATGM Crew Training Simulator designed for missile launcher crew training.",
        specifications: "Comprehensive 3D CGI scenario database\nRealistic missile dynamics\nEnvironmental effects: rain, fog, visibility\nTechnical fault simulation\nNight training provisions",
        images: [],
        published: true,
      },
    ],
  },
  {
    id: "oil-gas",
    name: "Industrial — Oil & Gas",
    icon: "Fuel",
    products: [
      {
        id: "oil-gas-automation",
        name: "Oil & Gas Automation System",
        description: "Customized automation solutions for oil and gas industry including boiler diagnostics and drilling automation.",
        specifications: "Boiler diagnostics automation\nDrilling process automation\nData analysis compatible systems",
        images: [],
        published: true,
      },
    ],
  },
  {
    id: "mining",
    name: "Industrial — Mining",
    icon: "Mountain",
    products: [
      {
        id: "mining-automation",
        name: "Mining Automation System",
        description: "Teleoperated mining equipment systems with robotic hardware & software for autonomous units.",
        specifications: "Vehicle telemetry and positioning\nSafety automation for mine sites\nRobotic hardware & software",
        images: [],
        published: true,
      },
    ],
  },
];

const AdminProductsPage = () => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<{ product: Product; categoryId: string } | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [productForm, setProductForm] = useState({
    name: "", description: "", specifications: "",
  });

  const [categoryForm, setCategoryForm] = useState({ name: "", icon: "Package" });

  const toggleCategory = (id: string) => {
    setExpandedCategory(prev => prev === id ? null : id);
  };

  const openCreateProduct = (categoryId: string) => {
    setEditingProduct(null);
    setActiveCategoryId(categoryId);
    setProductForm({ name: "", description: "", specifications: "" });
    setDialogOpen(true);
  };

  const openEditProduct = (product: Product, categoryId: string) => {
    setEditingProduct({ product, categoryId });
    setActiveCategoryId(categoryId);
    setProductForm({ name: product.name, description: product.description, specifications: product.specifications });
    setDialogOpen(true);
  };

  const handleSaveProduct = () => {
    setCategories(cats => cats.map(cat => {
      if (cat.id !== activeCategoryId) return cat;
      if (editingProduct) {
        return {
          ...cat,
          products: cat.products.map(p =>
            p.id === editingProduct.product.id ? { ...p, ...productForm } : p
          ),
        };
      }
      return {
        ...cat,
        products: [...cat.products, {
          id: Date.now().toString(),
          ...productForm,
          images: [],
          published: false,
        }],
      };
    }));
    setDialogOpen(false);
  };

  const deleteProduct = (categoryId: string, productId: string) => {
    setCategories(cats => cats.map(cat =>
      cat.id === categoryId
        ? { ...cat, products: cat.products.filter(p => p.id !== productId) }
        : cat
    ));
  };

  const toggleProductPublish = (categoryId: string, productId: string) => {
    setCategories(cats => cats.map(cat =>
      cat.id === categoryId
        ? { ...cat, products: cat.products.map(p => p.id === productId ? { ...p, published: !p.published } : p) }
        : cat
    ));
  };

  const openCreateCategory = () => {
    setEditingCategory(null);
    setCategoryForm({ name: "", icon: "Package" });
    setCategoryDialogOpen(true);
  };

  const openEditCategory = (cat: Category) => {
    setEditingCategory(cat);
    setCategoryForm({ name: cat.name, icon: cat.icon });
    setCategoryDialogOpen(true);
  };

  const handleSaveCategory = () => {
    if (editingCategory) {
      setCategories(cats => cats.map(c =>
        c.id === editingCategory.id ? { ...c, name: categoryForm.name, icon: categoryForm.icon } : c
      ));
    } else {
      setCategories(cats => [...cats, {
        id: Date.now().toString(),
        name: categoryForm.name,
        icon: categoryForm.icon,
        products: [],
      }]);
    }
    setCategoryDialogOpen(false);
  };

  const deleteCategory = (categoryId: string) => {
    setCategories(cats => cats.filter(c => c.id !== categoryId));
    if (expandedCategory === categoryId) setExpandedCategory(null);
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Package;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Products & Systems</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product categories and their products</p>
        </div>
        <Button onClick={openCreateCategory} size="sm">
          <Plus className="w-4 h-4 mr-1" /> Add Category
        </Button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => (
          <Card key={category.id} className="border-border/20 overflow-hidden">
            {/* Category Header — clickable button */}
            <div
              className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-defence-green/10 flex items-center justify-center text-defence-green">
                  {getIcon(category.icon)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{category.name}</p>
                  <p className="text-xs text-muted-foreground">{category.products.length} product{category.products.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEditCategory(category); }}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteCategory(category.id); }}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
                {expandedCategory === category.id
                  ? <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  : <ChevronRight className="w-4 h-4 text-muted-foreground" />
                }
              </div>
            </div>

            {/* Products List (expanded) */}
            {expandedCategory === category.id && (
              <div className="border-t border-border/20 bg-muted/10">
                <div className="px-5 py-3 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => openCreateProduct(category.id)}>
                    <Plus className="w-3 h-3 mr-1" /> Add Product
                  </Button>
                </div>
                {category.products.length === 0 ? (
                  <div className="px-5 pb-5 text-center text-muted-foreground text-sm">
                    No products yet. Add your first product.
                  </div>
                ) : (
                  <div className="space-y-0">
                    {category.products.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-start justify-between px-5 py-4 border-t border-border/10 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-foreground text-sm">{product.name}</p>
                            <Badge variant={product.published ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">
                              {product.published ? "Live" : "Draft"}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                          {product.specifications && (
                            <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-1">
                              Specs: {product.specifications.split("\n")[0]}...
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleProductPublish(category.id, product.id)}>
                            {product.published ? <Eye className="w-3.5 h-3.5 text-primary" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditProduct(product, category.id)}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteProduct(category.id, product.id)}>
                            <Trash2 className="w-3.5 h-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>Fill in the product details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Name</label>
              <Input value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. AMFDC MK-IV" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="Product overview..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Specifications (one per line)</label>
              <Textarea value={productForm.specifications} onChange={e => setProductForm(f => ({ ...f, specifications: e.target.value }))} rows={5} placeholder="Feature 1&#10;Feature 2&#10;..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveProduct}>{editingProduct ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Category Dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>Set the category name and icon.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category Name</label>
              <Input value={categoryForm.name} onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Radar Systems" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(iconMap).map(name => (
                  <button
                    key={name}
                    onClick={() => setCategoryForm(f => ({ ...f, icon: name }))}
                    className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-colors ${
                      categoryForm.icon === name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted/30"
                    }`}
                  >
                    {getIcon(name)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveCategory}>{editingCategory ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProductsPage;
