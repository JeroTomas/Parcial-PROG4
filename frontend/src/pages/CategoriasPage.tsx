import { useState, useEffect } from "react";
import type { Categoria } from "../types";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/categorias";

export default function CategoriasPage() {
  const [showForm, setShowForm] = useState(false);
  const [nombre, setNombre] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const categoriaActualizada = await updateCategoria(editingId, nombre, parentId);
        setCategorias(categorias.map(c => c.id === editingId ? categoriaActualizada : c));
      } else {
        const nuevaCategoria = await createCategoria(nombre, parentId);
        setCategorias([...categorias, nuevaCategoria]);
      }
      setShowForm(false);
      setNombre("");
      setParentId(null);
      setEditingId(null);
    } catch (error) {
      console.error("Error guardando categoría:", error);
      alert("Hubo un error al guardar la categoría. Verifica la conexión con el backend.");
    }
  };

  const startEdit = (cat: Categoria) => {
    setNombre(cat.name);
    setParentId(cat.parent_id ?? null);
    setEditingId(cat.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNombre("");
    setParentId(null);
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta categoría?")) {
      try {
        await deleteCategoria(id);
        setCategorias(categorias.filter(cat => cat.id !== id));
      } catch (error) {
        console.error("Error eliminando categoría:", error);
        alert("Hubo un error al eliminar la categoría.");
      }
    }
  };

  const getParentName = (parent_id: number | null | undefined) => {
    if (!parent_id) return null;
    return categorias.find(c => c.id === parent_id)?.name ?? null;
  };

  // When editing, exclude the current category from the parent options to avoid self-reference
  const parentOptions = categorias.filter(c => c.id !== editingId);

  const filteredCategorias = categorias.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-[#1d4ed8] font-bold tracking-widest text-sm uppercase mb-2">
            Categorías
          </h3>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            Gestión de Categorías
          </h1>
        </div>
        
        <div className="flex gap-4 items-center w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow md:flex-grow-0 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
          />
          <button 
            onClick={() => showForm ? handleCancel() : setShowForm(true)}
            className={`${showForm ? 'bg-gray-200 text-gray-800' : 'bg-[#1d4ed8] text-white'} hover:opacity-90 px-6 py-3 rounded-full font-medium transition-colors shadow-sm whitespace-nowrap`}
          >
            {showForm ? "Cancelar" : "+ Nueva Categoría"}
          </button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? "Editar Categoría" : "Crear Nueva Categoría"}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Categoría</label>
              <input 
                type="text" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                placeholder="Ej. Bebidas, Postres..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Padre (Opcional)</label>
              <select
                value={parentId ?? ""}
                onChange={(e) => setParentId(e.target.value ? parseInt(e.target.value) : null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9] bg-white"
              >
                <option value="">— Sin categoría padre —</option>
                {parentOptions.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Seleccioná una categoría padre si esta es una subcategoría (ej. "Gaseosas" dentro de "Bebidas").
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                className="bg-[#7f1d1d] hover:bg-red-900 text-white px-8 py-2.5 rounded-full font-medium transition-colors"
              >
                {editingId ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Categories */}
      {!showForm && (
        <>
          {loading ? (
            <div className="text-center py-20 text-gray-500">Cargando categorías...</div>
          ) : filteredCategorias.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
              <p className="text-gray-500">
                {searchTerm ? "No se encontraron categorías para tu búsqueda." : "Aún no hay categorías. ¡Haz clic en Nueva Categoría para empezar!"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCategorias.map((cat, index) => {
                const parentName = getParentName(cat.parent_id);
                return (
                  <div 
                    key={cat.id} 
                    className="border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow bg-white group flex flex-col justify-between h-64"
                  >
                    <div className="flex justify-between items-start">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#0ea5e9]/10 transition-colors">
                        <svg className="w-8 h-8 text-[#0ea5e9]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </div>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(cat.id);
                        }}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors"
                        title="Eliminar categoría"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-auto">
                      <div>
                        <p className="text-sm font-bold text-gray-400 mb-1">
                          0{index + 1}
                        </p>
                        <h2 className="text-3xl font-black text-gray-900 mb-1">
                          {cat.name}
                        </h2>
                        {parentName && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1d4ed8] bg-[#1d4ed8]/10 px-2 py-0.5 rounded-full">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                            </svg>
                            {parentName}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(cat);
                        }}
                        className="text-gray-400 hover:text-[#0ea5e9] bg-gray-50 hover:bg-[#0ea5e9]/10 p-2 rounded-full transition-colors flex items-center justify-center"
                        title="Editar categoría"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
