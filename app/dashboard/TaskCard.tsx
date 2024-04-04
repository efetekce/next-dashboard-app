import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TaskCard = () => {
  return (
    <Card>
      {/* <CardHeader className="">
        <CardTitle className="text-lg font-semibold">Operasyon Birimi</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader> */}
      <CardContent className="space-y-4 p-4">
        <h3 className="font-semibold">Operasyon Birimi</h3>
        <div className="flex items-start justify-center">
          <p>
            Bu örnek görevdir. Örnek görevin içeriğine dair açıklama
            detail’da bulunmaktadır.
          </p>
          <img src="/pfp.png" className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M8 2v4m8-4v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
            </g>
          </svg>

          <span>tarih</span>
        </div>
        <span>milestone name</span>
      </CardContent>
    </Card>
  );
};
export default TaskCard;
