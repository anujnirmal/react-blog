import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteProjectId)
            .setProject(config.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("APPWRITE SERVICE CREATE POST :: ", error)
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId, 
                config.appwriteCollectionId,
                slug, 
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("APPWRITE SERVICE UPDATE POST :: ", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("APPWRITE SERVICE DELETE POST :: ", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("APPWRITE SERVICE DELETE POST :: ", error)
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("APPWRITE SERVICE DELETE POST :: ", error)
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.storage.updateFile(
                config.appwriteBucketId,
                ID.unique,
                file
            );
        } catch (error) {
            console.log("APPWRITE SERVICE UPLOAD FILE:: ", error)
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            ) 
            return true;
        } catch (error) {
            console.log("APPWRITE SERVICE UPLOAD FILE:: ", error)
            return false;
        }
    }

    async getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("APPWRITE SERVICE UPLOAD FILE:: ", error)
            return false;
        }
    }
}

const service = new Service();
export default service;