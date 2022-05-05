class BooksController < ApplicationController
before_action :find_book, only: [:show, :update]

    def index
        render json: Book.all
    end

    def show
        render json: @book
    end

    def create
        book = Book.create!(book_params)
        render json: book, status: :created
    end

    def update
        @book.update!(book_params)
        render json: @book, status: :accepted
    end

private

    def find_book
        @book = Book.find(params[:id])
    end

    def book_params
        params.permit(:title, :author, :genre, :image, :number_of_pages)
    end

end
