import { Button } from "./components/ui/button";
import { Github, Wand2 } from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from "ai/react";
import logo from './images/logo.png';


export function App() {
const [temperature, setTemperature] = useState(0.5)
const [videoId, setVideoId] = useState<string | null>(null)
const gitHubRepository = "https://github.com/bruno88rick/include-video-upload-ai"

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json',
    },
  })
  
  return (
  
  <div className="min-h-screen flex flex-col">
    <div className="px-6 py-3 flex items-center justify-between border-b">
        {/*<h1 className="text-xl font-bold">Include VideoUpload.ia</h1>*/}
        <img src={logo} alt="Logo VideoUpload.AI" className="w-60 h-20 ml-2" />
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido com 💖 por Bruno Ricardo, Include Systems 
          </span>
          <Separator orientation='vertical' className="h-6" />
          <Button variant="outline" onClick={() => window.open(gitHubRepository, '_blank') }>
          <Github className="w-4 h-4 mr-2" />
          Repo on GitHub
          </Button>
        </div>
    </div>
  
    <main className="flex-1 p-6 flex gap-6">
      <div className="flex flex-col flex-1 gap-4"> 
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea 
            placeholder="Inclua aqui o Prompt para a IA..." 
            className="resize-none p-4 leading-relaxed"
            value={input}
            onChange={handleInputChange}
          />
          <Textarea 
            placeholder="Resultado Gerado pela IA..." 
            readOnly 
            className="resize-none p-4 leading-relaxed"
            value={completion}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Lembre-se: você pode utilizar a variável <code className="text-violet-400">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
        </p>
      </div>
      <aside className="w-80 space-y-6">
        <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
              <Label>Escolha um Prompt:</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div> 
            <div className="space-y-2">
              <Label>Modelo da IA:</Label>
              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-Turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar esta opção em breve...
              </span>
            </div>
            <Separator/>
            <div className="space-y-4">
              <Label>Temperatura para a IA:</Label>
              <Slider 
              min={0}
              max={1}
              step={0.1}
              value={[temperature]}
              onValueChange={value => setTemperature(value[0])}
              />      
              <span className="block text-xs text-muted-foreground italic">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros
              </span>
            </div>
            <Separator />
            <Button disabled={isLoading} Type="submit" className="w-full">
              Executar
              <Wand2 className="w-4 h-4 ml-2"/>
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}
