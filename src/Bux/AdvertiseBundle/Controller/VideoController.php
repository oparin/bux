<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 3:08 PM
 */

namespace Bux\AdvertiseBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * Class VideoController
 *
 * @package Bux\AdvertiseBundle\Controller
 */
class VideoController extends Controller
{
    /**
     * @Route("/video")
     * @Template()
     */
    public function indexAction()
    {
        return array();
    }
}