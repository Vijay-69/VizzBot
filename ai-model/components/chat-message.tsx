"use-client";

import { BeatLoader } from "react-spinners";
import { Copy } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar"
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export interface ChatMessageProps{
    role: "system" | "user",
    content?: string;
    isLoading?: boolean;
    src?: string;
}

export const ChatMessage = ({
    role,
    content,
    isLoading,
    src
  }: ChatMessageProps) => {
    const { toast } = useToast();
    const { theme } = useTheme();
    
    const onCopy = () => {
      if (!content) {
        return;
      }
  
      navigator.clipboard.writeText(content);
      toast({
        description: "Message copied to clipboard.",
        duration: 3000,
      })
    }
    return (
        <div className={cn(
          "group flex items-start gap-x-3 py-4 w-full",
          role === "user" && "justify-end"
        )}>
          
          {role !== "user" && src && <BotAvatar src={src} />      // to load the bot avatar to left side of its chat because previous was justified to end
          }   

          <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
            {isLoading 
              ? <BeatLoader color={theme === "light" ? "black" : "white"} size={5} /> 
              : content
            }
          </div>

          {role === "user" && <UserAvatar />}   

          {role !== "user" && !isLoading && (  
            <Button 
              onClick={onCopy} 
              className="opacity-0 group-hover:opacity-100 transition"            // using group hover allows to copy message of bot to clipboard because group class is assigned to parent div (third line of return) so when we hover around it we get the opacity of this button to 100
              size="icon"
              variant="ghost"
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
        </div>
      )
    }