import { Post } from "./components/Post";
import avatar from "./assets/avatars/image-juliusomo.png";

function App() {
  return (
    <div className="p-4">
      <Post 
        image={avatar} 
        username="Caio"
        createdAt="2 weeks ago" 
        content="Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well."
        score="12"
        />
    </div>
  )
}

export default App;
