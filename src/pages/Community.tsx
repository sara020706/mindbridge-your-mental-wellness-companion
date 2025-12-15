import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Share2, Search, Users, Shield } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const posts = [
  {
    id: 1,
    author: "Anonymous User",
    avatar: "🦊",
    content:
      "Today I finally opened up to my therapist about my anxiety. It was terrifying but also liberating. Remember, it's okay to ask for help. 💜",
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    topic: "Anxiety",
  },
  {
    id: 2,
    author: "Anonymous User",
    avatar: "🐨",
    content:
      "Just completed my 30-day meditation streak! 🧘 The difference in my mental clarity is amazing. If you're thinking about starting, just do it - even 5 minutes helps.",
    likes: 45,
    comments: 12,
    time: "5 hours ago",
    topic: "Mindfulness",
  },
  {
    id: 3,
    author: "Anonymous User",
    avatar: "🦋",
    content:
      "Struggling today. Some days are harder than others. But I'm here, I'm trying, and that counts for something. 💙",
    likes: 67,
    comments: 23,
    time: "1 day ago",
    topic: "Support",
  },
];

const topics = ["All", "Anxiety", "Depression", "Mindfulness", "Support", "Recovery", "Gratitude"];

export default function Community() {
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [newPost, setNewPost] = useState("");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    toast.success("Post shared anonymously!", {
      description: "Your voice matters. Thank you for sharing.",
    });
    setNewPost("");
  };

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId) ? prev.filter((id) => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-12 lg:pt-0">
      {/* Header */}
      <div
        className="rounded-2xl p-6 lg:p-8 text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Users className="h-6 w-6" />
          <h1 className="text-2xl lg:text-3xl font-bold">Community Support</h1>
        </div>
        <p className="opacity-90">Connect with others on their mental wellness journey</p>
        <div className="flex items-center gap-2 mt-4 bg-primary-foreground/20 w-fit px-3 py-1.5 rounded-full">
          <Shield className="h-4 w-4" />
          <span className="text-sm">100% Anonymous & Safe</span>
        </div>
      </div>

      {/* Topics */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {topics.map((topic) => (
          <Button
            key={topic}
            variant={selectedTopic === topic ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedTopic(topic)}
            className="shrink-0"
          >
            {topic}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search posts..." className="pl-10" />
      </div>

      {/* New Post */}
      <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
        <h3 className="font-semibold text-card-foreground mb-4">Share Your Thoughts</h3>
        <Textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind? Your post will be shared anonymously..."
          className="min-h-24 resize-none mb-4"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Shield className="h-3 w-3" /> Posted anonymously
          </p>
          <Button onClick={handlePost}>Share Post</Button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-card rounded-2xl p-6 shadow-sm border border-border"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl">
                {post.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-card-foreground">{post.author}</span>
                  <span className="text-xs text-muted-foreground">• {post.time}</span>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {post.topic}
                </span>
                <p className="text-card-foreground mt-3 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-6 mt-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={cn(
                      "flex items-center gap-1.5 text-sm transition-colors",
                      likedPosts.includes(post.id)
                        ? "text-destructive"
                        : "text-muted-foreground hover:text-destructive"
                    )}
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        likedPosts.includes(post.id) && "fill-current"
                      )}
                    />
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    {post.comments}
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
