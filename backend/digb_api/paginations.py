from rest_framework import pagination
from rest_framework.response import Response


DEFAULT_PAGE = 1
DEFAULT_PAGE_SIZE = 5


class CustomPagination(pagination.PageNumberPagination):
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 5000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'currentPage': int(self.request.GET.get('page', DEFAULT_PAGE)),
            'count': self.page.paginator.count,
            'results': data
        })
