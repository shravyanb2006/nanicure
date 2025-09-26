import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Trash2, Calendar } from "lucide-react";

interface StarredMessage {
  id: string;
  text: string;
  timestamp: Date;
  type?: 'remedy' | 'wellness' | 'voice' | 'general';
  source?: string;
}

interface StarredBookmarksProps {
  starredMessages: StarredMessage[];
  onRemoveStarred: (id: string) => void;
}

export function StarredBookmarks({ starredMessages, onRemoveStarred }: StarredBookmarksProps) {
  if (starredMessages.length === 0) {
    return (
      <Card className="p-8 text-center border shadow-sm">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-primary mb-2">No Starred Remedies Yet</h3>
        <p className="text-sm text-muted-foreground">
          Star Nani's messages and remedies to save them here for quick access later!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Star className="h-6 w-6 text-primary fill-current" />
        <h2 className="text-2xl font-bold text-primary">Your Starred Remedies</h2>
      </div>
      
      <div className="grid gap-4">
        {starredMessages.map((message) => (
          <Card key={message.id} className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary fill-current" />
                  <span className="text-xs font-medium text-primary uppercase tracking-wide">
                    {message.type || 'remedy'}
                  </span>
                  {message.source && (
                    <span className="text-xs text-muted-foreground">• {message.source}</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveStarred(message.id)}
                  className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-foreground mb-3">
                {message.text}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <time dateTime={message.timestamp.toISOString()}>
                  {message.timestamp.toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          💡 Tip: Click the star icon next to any remedy to save it here
        </p>
      </div>
    </div>
  );
}