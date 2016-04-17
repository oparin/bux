<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 2/20/15
 * Time: 12:43 PM
 */

namespace Bux\OfficeBundle\Form\Type\Advertise;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class BannerCreditsFormType
 *
 * @package Bux\OfficeBundle\Form\Type\Advertise
 */
class BannerCreditsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('packages', 'entity', array(
                'class'         => 'Bux\Admin\AdvertisementsBundle\Entity\BannerPackages',
                'property'      => 'credits',
                'constraints'   => array(
                    new NotBlank()
                )
            ));
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'banner_credits_form_type';
    }
}