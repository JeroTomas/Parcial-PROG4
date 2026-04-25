import { useState, useEffect } from "react";
import type { Producto, Categoria, Ingrediente } from "../types";
import { getProductos, createProducto, updateProducto, deleteProducto } from "../api/productos";
import { getCategorias } from "../api/categorias";
import { getIngredientes } from "../api/ingredientes";

export default function ProductosPage() {
  const [showForm, setShowForm] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodData, catData, ingData] = await Promise.all([
        getProductos(),
        getCategorias(),
        getIngredientes(),
      ]);
      setProductos(prodData);
      setCategorias(catData);
      setIngredientes(ingData);
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !categoryId) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    try {
      if (editingId) {
        const productoActualizado = await updateProducto(editingId, {
          name,
          price: parseFloat(price),
          category_id: parseInt(categoryId),
          image_url: imageUrl || undefined,
          description: description || undefined,
          ingredients: selectedIngredients,
        });
        setProductos(productos.map(p => p.id === editingId ? productoActualizado : p));
      } else {
        const nuevoProducto = await createProducto({
          name,
          price: parseFloat(price),
          category_id: parseInt(categoryId),
          image_url: imageUrl || undefined,
          description: description || undefined,
          ingredients: selectedIngredients,
        });
        setProductos([...productos, nuevoProducto]);
      }
      setShowForm(false);
      resetForm();
      setEditingId(null);
    } catch (error) {
      console.error("Error guardando producto:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };

  const startEdit = (prod: Producto) => {
    setName(prod.name);
    setPrice(prod.price.toString());
    setCategoryId(prod.category_id.toString());
    setImageUrl(prod.image_url || "");
    setDescription(prod.description || "");
    setSelectedIngredients(prod.ingredients || []);
    setEditingId(prod.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await deleteProducto(id);
        setProductos(productos.filter(prod => prod.id !== id));
      } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("Hubo un error al eliminar el producto.");
      }
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategoryId("");
    setImageUrl("");
    setDescription("");
    setSelectedIngredients([]);
  };

  const toggleIngredient = (id: number) => {
    setSelectedIngredients(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getCategoryName = (id: number) => {
    return categorias.find(c => c.id === id)?.name || "Sin Categoría";
  };

  const getIngredientName = (id: number) => {
    return ingredientes.find(i => i.id === id)?.name || "Desconocido";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-[#1d4ed8] font-bold tracking-widest text-sm uppercase mb-2">
            Productos
          </h3>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            Catálogo de Productos
          </h1>
        </div>
        
        <button 
          onClick={() => showForm ? handleCancel() : setShowForm(true)}
          className={`${showForm ? 'bg-gray-200 text-gray-800' : 'bg-[#1d4ed8] text-white'} hover:opacity-90 px-6 py-3 rounded-full font-medium transition-colors shadow-sm`}
        >
          {showForm ? "Cancelar" : "+ Nuevo Producto"}
        </button>
      </div>

      {/* Formulario Interactivo */}
      {showForm && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-8 animate-fade-in max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? "Editar Producto" : "Crear Nuevo Producto"}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="Ej. Hamburguesa Clásica"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="Ej. 1500.50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select 
                  required
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  {categorias.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de la Imagen</label>
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                placeholder="Breve descripción del producto..."
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Ingredientes que Contiene</label>
              {ingredientes.length === 0 ? (
                <p className="text-sm text-gray-500 italic">No hay ingredientes registrados. Debes crear ingredientes primero.</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {ingredientes.map(ing => (
                    <label key={ing.id} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors">
                      <input 
                        type="checkbox"
                        checked={selectedIngredients.includes(ing.id)}
                        onChange={() => toggleIngredient(ing.id)}
                        className="rounded text-[#0ea5e9] focus:ring-[#0ea5e9] w-4 h-4"
                      />
                      <span className="text-sm text-gray-700">{ing.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button 
                type="submit"
                className="bg-[#7f1d1d] hover:bg-red-900 text-white px-8 py-2.5 rounded-full font-medium transition-colors"
              >
                {editingId ? "Actualizar" : "Guardar Producto"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Products */}
      {!showForm && (
        <>
          {loading ? (
            <div className="text-center py-20 text-gray-500">Cargando productos...</div>
          ) : productos.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
              <p className="text-gray-500">
                Aún no hay productos. ¡Haz clic en Nuevo Producto para empezar!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productos.map((producto) => (
                <div 
                  key={producto.id} 
                  className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="h-48 w-full bg-white border-b border-gray-100 flex-shrink-0 relative overflow-hidden">
                    {producto.image_url ? (
                      <img 
                        src={producto.image_url} 
                        alt={producto.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          // Si la imagen falla en cargar, la ocultamos y mostramos el fondo blanco
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-white"></div>
                    )}
                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="text-[#1d4ed8] font-black text-sm tracking-tight">
                          ${producto.price.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(producto.id);
                        }}
                        className="bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-700 p-1.5 rounded-full shadow-sm transition-colors"
                        title="Eliminar producto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-3">
                      <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider bg-[#0ea5e9]/10 px-2 py-1 rounded-md">
                        {getCategoryName(producto.category_id)}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-black text-gray-900 mb-2 leading-tight">
                      {producto.name}
                    </h2>
                    
                    {producto.description && (
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                        {producto.description}
                      </p>
                    )}

                    {/* Ingredients Section */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                          Ingredientes
                        </h4>
                        {producto.ingredients && producto.ingredients.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {producto.ingredients.map(ingId => (
                              <span 
                                key={ingId} 
                                className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                              >
                                {getIngredientName(ingId)}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No especificados</p>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(producto);
                        }}
                        className="text-gray-400 hover:text-[#0ea5e9] bg-gray-50 hover:bg-[#0ea5e9]/10 p-2 rounded-full transition-colors flex items-center justify-center flex-shrink-0"
                        title="Editar producto"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
