<?php
/**
 * Created by PhpStorm.
 * User: kalyan
 * Date: 1/12/15
 * Time: 3:51 PM
 */

namespace Bux\OfficeBundle\Form\Type\Advertise;

use Bux\OfficeBundle\Form\Type\Advertise\DataTransformer\VideoCreditsOptionTransformer;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;
use Symfony\Component\Validator\Constraints\NotBlank;

/**
 * Class VideoCreditsFormType
 *
 * @package Bux\OfficeBundle\Form\Type\Advertise
 */
class VideoCreditsFormType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array                $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('video', 'entity', array(
                'class'         => 'Bux\Admin\AdvertisementsBundle\Entity\VideoPackages',
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
        return 'video_credits_form_type';
    }
}