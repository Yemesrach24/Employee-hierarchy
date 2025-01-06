

export default function Home() {
  return (
    <div
    className="h-screen bg-cover bg-center backdrop-blur-sm bg-white/30"
    style={{
      backgroundImage: "url('https://cdn4.vectorstock.com/i/1000x1000/49/63/hierarchy-in-company-organization-chart-tree-vector-18654963.jpg')",
    }}
  >
       <div className="flex">
    <h1> Employee Hierarchy </h1> 
  <button className="flex-initial rounded-lg w-32 bg-cyan-500 hover:bg-cyan-600">Preview</button>
  <button className="flex-initial w-32">Edit</button>
  </div>

  </div>
  );
}
