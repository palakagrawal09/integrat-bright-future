import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff, ChevronDown, ChevronRight, Shield, Search, Eye as EyeIcon, Target, Fuel, Mountain, Train, FlaskConical, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = { Shield, Search, EyeIcon, Target, Fuel, Mountain, Train, FlaskConical, Package };

const AdminProductsPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [activeCategoryId, setActiveCategoryId] = useState("");
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({ name: "", description: "", specifications: "" });
  const [categoryForm, setCategoryForm] = useState({ name: "", icon: "Package" });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const [{ data: cats }, { data: prods }] = await Promise.all([
      supabase.from("product_categories").select("*").order("sort_order"),
      supabase.from("products").select("*").order("sort_order"),
    ]);
    setCategories(cats || []);
    setProducts(prods || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const getCategoryProducts = (catId: string) => products.filter(p => p.category_id === catId);

  // Product CRUD
  const openCreateProduct = (catId: string) => {
    setEditingProduct(null); setActiveCategoryId(catId);
    setProductForm({ name: "", description: "", specifications: "" }); setDialogOpen(true);
  };
  const openEditProduct = (product: any) => {
    setEditingProduct(product); setActiveCategoryId(product.category_id);
    setProductForm({ name: product.name, description: product.description, specifications: product.specifications }); setDialogOpen(true);
  };
  const handleSaveProduct = async () => {
    if (editingProduct) {
      await supabase.from("products").update(productForm).eq("id", editingProduct.id);
      toast({ title: "Product updated" });
    } else {
      await supabase.from("products").insert({ ...productForm, category_id: activeCategoryId, sort_order: getCategoryProducts(activeCategoryId).length + 1 });
      toast({ title: "Product created" });
    }
    setDialogOpen(false); fetchData();
  };
  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" }); fetchData();
  };
  const toggleProductPublish = async (product: any) => {
    await supabase.from("products").update({ published: !product.published }).eq("id", product.id);
    fetchData();
  };

  // Category CRUD
  const openCreateCategory = () => { setEditingCategory(null); setCategoryForm({ name: "", icon: "Package" }); setCategoryDialogOpen(true); };
  const openEditCategory = (cat: any) => { setEditingCategory(cat); setCategoryForm({ name: cat.name, icon: cat.icon }); setCategoryDialogOpen(true); };
  const handleSaveCategory = async () => {
    if (editingCategory) {
      await supabase.from("product_categories").update(categoryForm).eq("id", editingCategory.id);
      toast({ title: "Category updated" });
    } else {
      await supabase.from("product_categories").insert({ ...categoryForm, sort_order: categories.length + 1 });
      toast({ title: "Category created" });
    }
    setCategoryDialogOpen(false); fetchData();
  };
  const deleteCategory = async (id: string) => {
    await supabase.from("product_categories").delete().eq("id", id);
    toast({ title: "Category deleted" }); fetchData();
  };

  const getIcon = (iconName: string) => { const Icon = iconMap[iconName] || Package; return <Icon className="w-4 h-4" />; };

  if (loading) return <div className="text-muted-foreground">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold">Products & Systems</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage product categories and their products</p>
        </div>
        <Button onClick={openCreateCategory} size="sm"><Plus className="w-4 h-4 mr-1" /> Add Category</Button>
      </div>

      <div className="space-y-3">
        {categories.map((category) => {
          const catProducts = getCategoryProducts(category.id);
          return (
            <Card key={category.id} className="border-border/20 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setExpandedCategory(prev => prev === category.id ? null : category.id)}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-defence-green/10 flex items-center justify-center text-defence-green">{getIcon(category.icon)}</div>
                  <div>
                    <p className="font-semibold text-foreground">{category.name}</p>
                    <p className="text-xs text-muted-foreground">{catProducts.length} product{catProducts.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); openEditCategory(category); }}><Pencil className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); deleteCategory(category.id); }}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  {expandedCategory === category.id ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              {expandedCategory === category.id && (
                <div className="border-t border-border/20 bg-muted/10">
                  <div className="px-5 py-3 flex justify-end">
                    <Button size="sm" variant="outline" onClick={() => openCreateProduct(category.id)}><Plus className="w-3 h-3 mr-1" /> Add Product</Button>
                  </div>
                  {catProducts.length === 0 ? (
                    <div className="px-5 pb-5 text-center text-muted-foreground text-sm">No products yet.</div>
                  ) : catProducts.map((product) => (
                    <div key={product.id} className="flex items-start justify-between px-5 py-4 border-t border-border/10 hover:bg-muted/20 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground text-sm">{product.name}</p>
                          <Badge variant={product.published ? "default" : "secondary"} className="text-[10px] px-1.5 py-0">{product.published ? "Live" : "Draft"}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleProductPublish(product)}>
                          {product.published ? <Eye className="w-3.5 h-3.5 text-primary" /> : <EyeOff className="w-3.5 h-3.5 text-muted-foreground" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditProduct(product)}><Pencil className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteProduct(product.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Product Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>Fill in the product details below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2"><label className="text-sm font-medium">Product Name</label><Input value={productForm.name} onChange={e => setProductForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. AMFDC MK-IV" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Description</label><Textarea value={productForm.description} onChange={e => setProductForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Specifications (one per line)</label><Textarea value={productForm.specifications} onChange={e => setProductForm(f => ({ ...f, specifications: e.target.value }))} rows={5} /></div>
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
            <div className="space-y-2"><label className="text-sm font-medium">Category Name</label><Input value={categoryForm.name} onChange={e => setCategoryForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Icon</label>
              <div className="flex flex-wrap gap-2">
                {Object.keys(iconMap).map(name => (
                  <button key={name} onClick={() => setCategoryForm(f => ({ ...f, icon: name }))} className={`w-9 h-9 flex items-center justify-center border rounded-sm transition-colors ${categoryForm.icon === name ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted/30"}`}>{getIcon(name)}</button>
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
