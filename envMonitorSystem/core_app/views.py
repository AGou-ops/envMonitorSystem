# from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render, redirect

# @login_required
from django.views.decorators.clickjacking import xframe_options_exempt


@xframe_options_exempt
def index(request):
    if not request.user.is_authenticated:

        return redirect('%s?next=%s' % (settings.FORBIDDEN, request.path))
    else:
        return render(request, 'core_app/index.html')


def forbidden(request):
    return render(request, 'core_app/403.html')


def typhoon(request):
    return render(request, 'typhoon_module/index.html')


def main(request):
    return render(request, 'main_module/index.html')


def rain(request):
    return render(request, 'rainLayer_module/index.html')


def basic(request):
    return render(request, 'basic_module/index.html')
