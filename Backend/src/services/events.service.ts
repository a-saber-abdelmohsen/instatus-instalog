import { PrismaClient, Event } from '@prisma/client'
import { error } from 'console';
import { query } from 'express';
import { PaginationResult } from '../models/PaginationResult';




export async function addEvent(event: Event): Promise<Event | undefined> {
    const prisma = new PrismaClient();
    try {
        const eventResult = await prisma.event.create({
            data: {
                object: event.object,
                actor_id: event.actor_id,
                actor_name: event.actor_name,
                location: event.location,
                target_id: event.target_id,
                target_name: event.target_name,
                group: event.group,
                actionId: event.actionId,
                metadata: event.metadata,
            }
        });
        return eventResult;
    } catch (error) {
        console.error("Error adding event:", error);
        return undefined;
    } finally {
        await prisma.$disconnect();
    }
}


export async function getEventsPage(pageNumber: number, pageSize: number, searchText?: string, actor_id?: string, target_id?: string, actionId?: number): Promise<{events: Event[], pagination: PaginationResult}> {
    const prisma = new PrismaClient();
    try {
        const skip = (pageNumber - 1) * pageSize;
        const take = pageSize;
        let eventsQuery: any = {
            orderBy: { occurred_at: 'desc' },
            include: {
                action: true,
            }
        };

        if (searchText) {
            eventsQuery.where = {
                OR: [
                    { group: { contains: searchText } },
                    { actor_name: { contains: searchText } },
                    { target_name: { contains: searchText } },
                    { location: { contains: searchText } },
                    { metadata: { contains: searchText } },
                ],
            };
        }

        if (actor_id) {
            if (!eventsQuery.where) {
                eventsQuery.where = {};
            }
            eventsQuery.where.actor_id = actor_id;
        }

        if (target_id) {
            if (!eventsQuery.where) {
                eventsQuery.where = {};
            }
            eventsQuery.where.target_id = target_id;
        }
        
        if (actionId) {
            if (!eventsQuery.where) {
                eventsQuery.where = {};
            }
            eventsQuery.where.actionId = actionId;
        }

        const totalEventsCount = await prisma.event.count({where: eventsQuery.where});
        
        
        
        eventsQuery.skip = skip;
        eventsQuery.take = take;
        const pagination: PaginationResult = {
            currentPage: pageNumber,
            totalCount: totalEventsCount,
            pageSize: pageSize,
            totalPages: Math.ceil(totalEventsCount/pageSize),
            get hasNext() {
                return this.currentPage < this.totalPages;
            },
        }
        const events = await prisma.event.findMany(eventsQuery);
        return { events, pagination };
    } catch (error) {
        console.error("Error fetching events:", error);
        throw new Error("Failed to fetch events");
    } finally {
        await prisma.$disconnect();
    }
}