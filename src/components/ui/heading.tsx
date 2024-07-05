import { cn } from "~/lib/utils";

interface HeadingProps {
    title: string;
    description: string;
    className?: string
  }
  
  export const Heading: React.FC<HeadingProps> = ({ title, description, className }) => {
    return (
      <div className={cn("space-y-1", className)}>
        <h2 className="text-xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
      </div>
    );
  };