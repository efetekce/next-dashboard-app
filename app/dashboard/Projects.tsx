import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Projects = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex flex-col h-full items-center justify-between p-4">
        <div className="flex flex-col justify-evenly">
          <p className="text-2xl">Projeler</p>
          <Accordion type="single" collapsible className=" w-full">
            <AccordionItem value="item-1" className="border-0">
              <AccordionTrigger className="font-bold">
                Proje 1
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 text-xl hover:bg-slate-100">
                <a href="#">Overview</a>
                <a href="#">Notifications</a>
                <a href="#">Analytics</a>
                <a href="#">Reports</a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-0">
              <AccordionTrigger className="font-bold">
                Proje 2
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 text-xl">
                <a href="#">Overview</a>
                <a href="#">Notifications</a>
                <a href="#">Analytics</a>
                <a href="#">Reports</a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="font-bold">
                Proje 3
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 text-xl">
                <a href="#">Overview</a>
                <a href="#">Notifications</a>
                <a href="#">Analytics</a>
                <a href="#">Reports</a>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-0">
              <AccordionTrigger className="font-bold">
                Proje 4
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 text-xl">
                <a href="#">Overview</a>
                <a href="#">Notifications</a>
                <a href="#">Analytics</a>
                <a href="#">Reports</a>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* user bar */}
        <div>
          <p>Olivia Rhye</p>
          <p>iliva@dotcom.com</p>
        </div>
      </div>
    </section>
  );
};
export default Projects;
