import { useState, useEffect } from "react";
import type { Ingrediente } from "../types";
import { getIngredientes, createIngrediente, updateIngrediente, deleteIngrediente } from "../api/ingredientes";

export default function IngredientesPage() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIngredientes();
  }, []);

  const loadIngredientes = async () => {
    try {
      setLoading(true);
      const data = await getIngredientes();
      setIngredientes(data);
    } catch (error) {
      console.error("Error cargando ingredientes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const ingredienteActualizado = await updateIngrediente(editingId, name, description);
        setIngredientes(ingredientes.map(ing => ing.id === editingId ? ingredienteActualizado : ing));
      } else {
        const nuevoIngrediente = await createIngrediente(name, description);
        setIngredientes([...ingredientes, nuevoIngrediente]);
      }
      setShowForm(false);
      setName("");
      setDescription("");
      setEditingId(null);
    } catch (error) {
      console.error("Error guardando ingrediente:", error);
      alert("Hubo un error al guardar el ingrediente.");
    }
  };

  const startEdit = (ing: Ingrediente) => {
    setName(ing.name);
    setDescription(ing.description || "");
    setEditingId(ing.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar este ingrediente?")) {
      try {
        await deleteIngrediente(id);
        setIngredientes(ingredientes.filter(ing => ing.id !== id));
      } catch (error) {
        console.error("Error eliminando ingrediente:", error);
        alert("Hubo un error al eliminar el ingrediente.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h3 className="text-[#1d4ed8] font-bold tracking-widest text-sm uppercase mb-2">
            Ingredientes
          </h3>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
            Gestión de Ingredientes
          </h1>
        </div>
        
        <button 
          onClick={() => showForm ? handleCancel() : setShowForm(true)}
          className={`${showForm ? 'bg-gray-200 text-gray-800' : 'bg-[#1d4ed8] text-white'} hover:opacity-90 px-6 py-3 rounded-full font-medium transition-colors shadow-sm`}
        >
          {showForm ? "Cancelar" : "+ Nuevo Ingrediente"}
        </button>
      </div>

      {/* Formulario Interactivo */}
      {showForm && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm mb-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">{editingId ? "Editar Ingrediente" : "Crear Nuevo Ingrediente"}</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Ingrediente</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                placeholder="Ej. Harina, Azúcar..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breve Descripción (Opcional)</label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ea5e9]"
                placeholder="Ej. Harina 0000 para repostería"
              />
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

      {/* Grid of Ingredients from Backend */}
      {!showForm && (
        <>
          {loading ? (
            <div className="text-center py-20 text-gray-500">Cargando ingredientes...</div>
          ) : ingredientes.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
              <p className="text-gray-500">
                Aún no hay ingredientes. ¡Haz clic en Nuevo Ingrediente para empezar!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ingredientes.map((ingrediente, index) => (
                <div 
                  key={ingrediente.id} 
                  className="border border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-shadow cursor-pointer bg-white group flex flex-col justify-between h-72"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gray-50 group-hover:bg-[#0ea5e9]/10 transition-colors">
                      <svg className="w-8 h-8 text-[#7f1d1d]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(ingrediente.id);
                      }}
                      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors"
                      title="Eliminar ingrediente"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <p className="text-sm font-bold text-gray-400 mb-2">
                        0{index + 1}
                      </p>
                      <h2 className="text-3xl font-black text-gray-900 mb-1">
                        {ingrediente.name}
                      </h2>
                      {ingrediente.description && (
                        <p className="text-gray-500 line-clamp-2">{ingrediente.description}</p>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(ingrediente);
                      }}
                      className="text-gray-400 hover:text-[#0ea5e9] bg-gray-50 hover:bg-[#0ea5e9]/10 p-2 rounded-full transition-colors flex items-center justify-center"
                      title="Editar ingrediente"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
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
