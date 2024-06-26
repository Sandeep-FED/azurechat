import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FC, Suspense } from "react";
import { Button } from "../ui/button";
import { DisplayError } from "../ui/error/display-error";
import { PageLoader } from "../ui/page-loader";
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ReportingHero } from "./reporting-hero";
import { FindAllChatThreadsForAdmin } from "./reporting-services/reporting-service";
import ChatThreadRow from "./table-row";

const SEARCH_PAGE_SIZE = 25;

interface ChatReportingProps {
  page: number;
}

export const ChatReportingPage: FC<ChatReportingProps> = async (props) => {
  return (
    <ScrollArea className="flex-1 h-full">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen relative">
        <div className="dark:bg-[url('/Quadra_Light_Logo.png')] bg-[url('/Quadra_Dark_Logo.png')] w-28 h-8 bg-contain bg-no-repeat absolute top-8 right-8"></div>
        <ReportingHero />
        <Suspense fallback={<PageLoader />} key={props.page}>
          <ReportingContent {...props} />
        </Suspense>
      </main>
    </ScrollArea>
  );
};

async function ReportingContent(props: ChatReportingProps) {
  let pageNumber = props.page < 0 ? 0 : props.page;
  let nextPage = pageNumber + 1;
  let previousPage = pageNumber - 1;

  const chatHistoryResponse = await FindAllChatThreadsForAdmin(
    SEARCH_PAGE_SIZE,
    props.page * SEARCH_PAGE_SIZE
  );

  if (chatHistoryResponse.status !== "OK") {
    return <DisplayError errors={chatHistoryResponse.errors} />;
  }

  const chatThreads = chatHistoryResponse.response;
  const hasMoreResults = chatThreads.length === SEARCH_PAGE_SIZE;
  return (
    <div className="container max-w-full py-3 px-32 pt-0 mt-12">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Conversation</TableHead>
            <TableHead className="w-[200px]">User</TableHead>
            <TableHead className="w-[100px]">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chatThreads &&
            chatThreads.map((chatThread) => (
              <ChatThreadRow key={chatThread.id} {...chatThread} />
            ))}
        </TableBody>
      </Table>
      <div className="flex gap-2 p-2 justify-end">
        {previousPage >= 0 && (
          <Button asChild size={"icon"} variant={"outline"}>
            <Link href={"/reporting?pageNumber=" + previousPage}>
              <ChevronLeft />
            </Link>
          </Button>
        )}
        {hasMoreResults && (
          <Button asChild size={"icon"} variant={"outline"}>
            <Link href={"/reporting?pageNumber=" + nextPage}>
              <ChevronRight />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
