import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Freelance Designer",
    image: "/placeholder.svg",
    quote: "ProposalPro AI has helped me win more clients by creating professional proposals in minutes.",
  },
  {
    name: "Michael Chen",
    role: "Web Developer",
    image: "/placeholder.svg",
    quote: "The time I save using this tool allows me to focus on actual client work. Highly recommended!",
  },
  {
    name: "Emma Davis",
    role: "Digital Marketing Consultant",
    image: "/placeholder.svg",
    quote: "My proposal acceptance rate has increased significantly since I started using ProposalPro AI.",
  },
];

export const Testimonials = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};