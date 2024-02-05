import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import {Tabs, Tab} from "@nextui-org/react";

export default function OrderCard({order}){
    return (
        <div className="w-full h-full px-4 py-2">
        <Card className="w-full h-full bg-primary">
            <CardHeader className="flex justify-center">
                <Tabs color="secondary">
                    <Tab key='progress' title='Progress'></Tab>
                    <Tab key='history' title='History'></Tab>
                </Tabs>
            </CardHeader>
        </Card>
        </div>
    )
}