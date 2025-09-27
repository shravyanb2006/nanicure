import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Star, Trash2, Download, Menu } from "lucide-react";
import { Header } from "@/components/Header";
import { SideMenu } from "@/components/SideMenu";
import { useToast } from "@/hooks/use-toast";

interface StarredMessage {
  id: string;
  text: string;
  timestamp: Date;
  type?: string;
  source?: string;
}

const StarredPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [starredMessages, setStarredMessages] = useState<StarredMessage[]>([]);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    loadStarredMessages();
  }, []);

  const loadStarredMessages = () => {
    const saved = localStorage.getItem('nanicure_starred');
    if (saved) {
      const messages = JSON.parse(saved).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setStarredMessages(messages);
    }
  };

  const removeStarred = (id: string) => {
    const updated = starredMessages.filter(msg => msg.id !== id);
    setStarredMessages(updated);
    localStorage.setItem('nanicure_starred', JSON.stringify(updated));
    
    toast({
      title: "Removed from starred",
      description: "Remedy removed from your collection",
    });
  };

  const exportStarred = () => {
    const exportData = {
      starredRemedies: starredMessages,
      exportDate: new Date().toISOString(),
      totalCount: starredMessages.length
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nanicure-starred-remedies-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Export completed",
      description: "Your starred remedies have been downloaded",
    });
  };

  const clearAllStarred = () => {
    if (window.confirm("Are you sure you want to remove all starred remedies? This action cannot be undone.")) {
      setStarredMessages([]);
      localStorage.removeItem('nanicure_starred');
      
      toast({
        title: "All starred remedies cleared",
        description: "Your collection has been cleared",
      });
    }
  };

  const renderMessage = (message: StarredMessage) => {
    const isMarkdown = message.text.includes('**');
    
    if (isMarkdown) {
      const formattedText = message.text
        .split('\n')
        .map((line, index) => {
          if (line.includes('**')) {
            const parts = line.split('**');
            return (
              <div key={index} className="mb-1">
                {parts.map((part, partIndex) => 
                  partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
                )}
              </div>
            );
          }
          return <div key={index} className={line.startsWith('•') ? 'ml-4 mb-1' : 'mb-1'}>{line}</div>;
        });
      
      return <div className="whitespace-pre-wrap">{formattedText}</div>;
    }
    
    return <div className="whitespace-pre-wrap">{message.text}</div>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuClick={() => {}}
        selectedRegion=""
        onRegionChange={() => {}}
        onLoginClick={() => {}}
        isLoggedIn={true}
        userName=""
      />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSideMenu(true)}
            className="p-2"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="nani-tagline text-4xl mb-2">
            Starred Remedies
          </h1>
          <p className="nani-description text-lg">
            Your saved collection of Nani's wisdom
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {starredMessages.length} remedies saved
          </p>
        </div>

        {starredMessages.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No Starred Remedies Yet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Star remedies while chatting with Nani to save them here for easy access
              </p>
              <Button onClick={() => navigate('/nani-ke-nuske')}>
                Start Chatting with Nani
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Action Buttons */}
            <div className="mb-6 flex gap-3 justify-center">
              <Button onClick={exportStarred} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export All
              </Button>
              <Button onClick={clearAllStarred} variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>

            {/* Starred Messages */}
            <div className="space-y-4">
              {starredMessages.map((message) => (
                <Card key={message.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <div>
                          <CardTitle className="text-base">
                            {message.type || 'Nani\'s Remedy'}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {message.source || 'Chat with Nani'} • {message.timestamp.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStarred(message.id)}
                        className="text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      {renderMessage(message)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>

      <SideMenu 
        currentPage="starred"
        isOpen={showSideMenu}
        onClose={() => setShowSideMenu(false)}
      />
    </div>
  );
};

export default StarredPage;